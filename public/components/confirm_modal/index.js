import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiText,
} from '@elastic/eui';
import '../../less/main.less';

export function ConfirmModal(props) {

  return (
        <EuiOverlayMask>
          <EuiModal onClose={props.closeModal} className="cookie-confirm-modal" >
            <EuiModalHeader>
              <EuiModalHeaderTitle>
                {props.modalHeader}
              </EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText>
                <p>
                  {props.modalText}
                </p>
              </EuiText>
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButton href={props.privacyUrl} target={'_blank'}>
                View Privacy Statement
              </EuiButton>
              <EuiButton onClick={props.closeModal} fill>
                 Accept Policy
             </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>

  )
}
