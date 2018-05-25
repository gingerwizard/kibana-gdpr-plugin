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

chromeNavControlsRegistry.register(constant({
  name: 'gdpr-plugin',
  order: 1000,
  template
}));

const module = uiModules.get('gdpr-plugin', ['kibana']);
module.controller('privacyNavController', ($scope, globalNavState, kbnBaseUrl, Private, privacyUrl, cookieConfirmHeader, cookieConfirmBody, displayCountries) => {
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
  }

  if (document.cookie.split(';').filter((item) => {
      return item.includes('acceptCookiePolicy=true')
  }).length == 0) {

    let req = $.ajax({ dataType: "json", url: 'http://ip-api.com/json?callback=?',
        success: function( data ) {
            console.log(data.country)
            if (displayCountries.indexOf(data.country) > -1) {
              render(<ConfirmModal closeModal={closeWindow} modalHeader={cookieConfirmHeader} modalText={cookieConfirmBody}/>, document.getElementById("confirmCookie"));
            }
        },
        error: function (jq,status,message) {
          console.log("Unable to determine Location. Requiring Cookie confirmation");
          render(<ConfirmModal closeModal={closeWindow} modalHeader={cookieConfirmHeader} modalText={cookieConfirmBody}/>, document.getElementById("confirmCookie"));
        },
        timeout:5000
    })
  }

});
