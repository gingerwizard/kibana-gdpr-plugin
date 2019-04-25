import React from 'react';
import { uiModules } from 'ui/modules';
import uiRoutes from 'ui/routes';
import chrome from 'ui/chrome';
import 'ui/autoload/styles';
import './less/main.less';

import { ConfirmModal } from './components';

uiRoutes.enable();

const app = uiModules.get('apps/kibana_gdpr_plugin');


function RootController($scope, $element, $http) {
  const domNode = $element[0];
  console.log('LOADING')
  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}

chrome.setRootController('kibana_gdpr_plugin', RootController);
