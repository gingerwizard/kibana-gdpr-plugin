/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { constant } from 'lodash';
import { chromeNavControlsRegistry } from 'ui/registry/chrome_nav_controls';
import { uiModules } from 'ui/modules';
import template from './nav_control.html';
import { ConfirmModal } from '../../components';
import chrome from 'ui/chrome';

chromeNavControlsRegistry.register(constant({
  name: 'kibana_gdpr_plugin',
  order: 1000,
  template
}));

const module = uiModules.get('kibana_gdpr_plugin', ['kibana']);
module.controller('privacyNavController', ($http, $scope, globalNavState, kbnBaseUrl, Private, privacyUrl, cookieConfirmHeader, cookieConfirmBody, displayCountries) => {
  $scope.openPrivacyPolicy = () => {
    window.open(privacyUrl, '_blank');
  }
  $scope.accountTooltip = (tooltip) => {
    // If the sidebar is open and there's no disabled message,
    // then we don't need to show the tooltip.
    if (globalNavState.isOpen()) {
      return;
    }
    return tooltip;
  };

  const closeWindow = () => {
      unmountComponentAtNode(document.getElementById("confirmCookie"));
      document.cookie = "acceptCookiePolicy=true";
      //fire google tag manager event if it exists
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
       'event': 'cookiesAccepted'
      });
  }
  const basePath = chrome.getBasePath();
  const modal = (<ConfirmModal privacyUrl={privacyUrl} closeModal={closeWindow} modalHeader={cookieConfirmHeader} modalText={cookieConfirmBody}/>)
  if (document.cookie.split(';').filter((item) => {
      return item.includes('acceptCookiePolicy=true')
  }).length == 0) {
      let req = $.ajax({ dataType: "json", url: 'https://api.ipify.org?format=jsonp&callback=?',
          success: function( data ) {
            console.log(data.ip)
            //internal route for country resolution
            $http.get(basePath+'/api/kibana_gdpr_plugin/ip_info?ip='+data.ip).then(function mySuccess(data) {
              console.log(data.data.country)
              if (displayCountries.indexOf(data.data.country) > -1) {
                render (modal,document.getElementById("confirmCookie"));
              } else {
                document.cookie = "acceptCookiePolicy=true";
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                 'event': 'cookiesAccepted'
                });
              }
            }, function myError(response) {
                console.log("Unable to identify country from ip"+data.ip)
                render (modal,document.getElementById("confirmCookie"));
            });
          },
          error: function (jq,status,message) {
            console.log("Unable to determine Ip. Requiring Cookie confirmation");
            render (modal,document.getElementById("confirmCookie"));
          },
          timeout:5000
      })
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
     'event': 'cookiesAccepted'
    });
  }

});
