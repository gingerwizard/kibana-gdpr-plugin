/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { FormattedMessage } from '@kbn/i18n/react';
import React, {
  Component,
} from 'react';

import {
  EuiHeaderLink,
} from '@elastic/eui';


export class PrivacyNavControl extends Component {

  constructor(props) {
    super(props);
  }

  onMenuButtonClick = () => {
    console.log('Open Privacy Link')
  };

  render() {
    const { privacyUrl } = this.props;
    return (
      <EuiHeaderLink href={privacyUrl} iconType="lock"  target="_blank" />
    );
  }
}
