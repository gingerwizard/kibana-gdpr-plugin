import React, {
  Component,
} from 'react';

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

export class ConfirmModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.callback = props.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ isModalVisible: false });
    this.callback();
  }

  render() {
    let modal;
    if (this.state.isModalVisible) {
      modal = (<EuiOverlayMask>
        <EuiModal onClose={this.closeModal} className="cookie-confirm-modal" >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              {this.props.modalHeader}
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>
              <p>
                {this.props.modalText}
              </p>
            </EuiText>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton href={this.props.privacyUrl} target={'_blank'}>
              View Privacy Statement
            </EuiButton>
            <EuiButton onClick={this.closeModal} fill>
               Accept Policy
           </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      </EuiOverlayMask>)
    }
    return (
      <div>
        {modal}
      </div>
    );
  }
}
