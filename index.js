import country_info from './server/routes/country_info';
import { resolve } from 'path';

import React from 'react';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    configPrefix: 'gdpr',
    publicDir: resolve(__dirname, 'public'),
    name: 'kibana_gdpr_plugin',
    uiExports: {
      chromeNavControls: ['plugins/kibana_gdpr_plugin/views/nav_control/nav_control'],
      injectDefaultVars: function (server) {
        const config = server.config();
        return {
          privacyUrl: config.get('gdpr.privacyUrl'),
          cookieConfirmHeader: config.get('gdpr.cookieConfirmHeader'),
          cookieConfirmBody: config.get('gdpr.cookieConfirmBody'),
          displayCountries: config.get('gdpr.displayCountries'),
          gtm_id: config.get('gdpr.gtm_id'),
        };
      }
    },

    config(Joi) {
      return Joi.object({
        gtm_id: Joi.string(),
        enabled: Joi.boolean().default(true),
        privacyUrl: Joi.string().default('https://www.elastic.co/legal/privacy-statement'),
        cookieConfirmHeader: Joi.string().default('Accept Cookie Policy'),
        cookieConfirmBody: Joi.string().default('Please confirm you accept the use of cookies on this site'),
        displayCountries: Joi.array().items(Joi.string()).default(["Austria","Belgium","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark",
          "Estonia","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Latvia","Lithuania",
          "Luxembourg","Malta","Netherlands","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","United Kingdom"])
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      const config = server.config();
      // Add server routes and initialize the plugin here
      country_info(server);
    }
  });
}
