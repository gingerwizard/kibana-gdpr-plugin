/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { I18nContext } from 'ui/i18n';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { constant } from 'lodash';
import { chromeNavControlsRegistry } from 'ui/registry/chrome_nav_controls';
import { uiModules } from 'ui/modules';
import template from './nav_control.html';
import { ConfirmModal } from '../../components';
import chrome from 'ui/chrome';
import TagManager from '../../components/gtm/TagManager'
//7.0 changes
import { chromeHeaderNavControlsRegistry } from 'ui/registry/chrome_header_nav_controls';
import { PrivacyNavControl } from './nav_control_component';
import { NavControlSide } from 'ui/chrome/directives/header_global_nav';


chromeHeaderNavControlsRegistry.register(($http,kbnBaseUrl, privacyUrl, cookieConfirmHeader, cookieConfirmBody, displayCountries, gtm_id) => ({
  name: 'kibana_gdpr_plugin',
  order: 1,
  side: NavControlSide.Right,
  render(el) {
    const props = {
      privacyUrl: privacyUrl
    };
    const tagManagerArgs = {
      gtmId: gtm_id
    }
    
    const closeWindow = () => {
        document.cookie = "acceptCookiePolicy=true";
        TagManager.initialize(tagManagerArgs)
        //fire google tag manager event if it exists
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
         'event': 'cookiesAccepted'
        });
    }
    const basePath = chrome.getBasePath();
    const modal = (<ConfirmModal privacyUrl={privacyUrl} closeModal={closeWindow} modalHeader={cookieConfirmHeader} modalText={cookieConfirmBody} />)

    if (document.cookie.split(';').filter((item) => {
        return item.includes('acceptCookiePolicy=true')
    }).length == 0) {
      fetch('https://api.ip.sb/geoip', {
          method: 'GET'
        }).then(res => res.json())
        .then( data => {
            console.log(data.ip)
            console.log(data.country)
            if (displayCountries.indexOf(data.country) > -1) {
              render( modal, el )
            } else {
              document.cookie = "acceptCookiePolicy=true";
              TagManager.initialize(tagManagerArgs)
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
               'event': 'cookiesAccepted'
              });
            }
          }
        )
        .catch( error => {
            console.log("Unable to determine Ip. Requiring Cookie confirmation");
            console.log(error);
            render( modal, el )
          }
        );
    } else {
      TagManager.initialize(tagManagerArgs)
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
       'event': 'cookiesAccepted'
      });
    }

    render(
        <PrivacyNavControl {...props} />,
      el
    );
    return () => unmountComponentAtNode(el);
  }
}));

chromeNavControlsRegistry.register(constant({
  name: 'kibana_gdpr_plugin',
  order: 1000,
  template
}));
