
import React, { Component } from 'react';
import { Modal, } from 'antd';


export default class PestDetectionModal extends Component {

    render() {
        const {  } = this.props;
        const { modalVisible, onClose, onOk } = this.props;

        return (
            <Modal  title={`Create Pest Detection`}
                style={{ top: 20 }}
                width={1200}
                closable={true}
                destroyOnClose={true}
                onOk={onOk}
                onCancel={onClose}
                visible={modalVisible}>

                <div className="row">
                    <div className="col-md-7">                  
                    
                    </div>

                    <div className="col-md-5">
                    
                    </div>
                </div>

            </Modal>
        );
    }

}