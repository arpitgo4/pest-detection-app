
import React, { Component } from 'react';
import { Modal, Upload, Icon, Input, } from 'antd';


export default class PestDetectionModal extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        pest_name: '',
    };

    render() {
        const { modalVisible, onClose, onOk } = this.props;

        return (
            <Modal  title={`Create Pest Detection`}
                style={{ top: 20 }}
                width={1200}
                closable={true}
                destroyOnClose={true}
                onOk={() => onOk(this.state['pest_name'], this.state.fileList)}
                onCancel={onClose}
                visible={modalVisible}>

                <div className="row">
                    <div className="col-md-12"> 
                        <div style={{ width: 300 }}>                 
                            {this._renderUploadButton()}
                        </div>

                        <Input 
                            ref="pest_name"
                            placeholder="Pest Name" 
                            value={this.state.pest_name}
                            onChange={(f_n => e => this._searchInputChange.bind(this)(e, f_n))('pest_name')} 
                            style={{ width: 300, marginTop: 20 }} />

                    </div>
                </div>

            </Modal>
        );
    }

    _searchInputChange(e, field_name) {
        this.setState({ ...this.state.filters, [field_name]: e.target.value });
    }

    _renderUploadButton() {
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    multiple={false}
                    directory={false}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}>
                    {fileList.length !== 0 ? null : uploadButton}
                </Upload>
                <Modal 
                    visible={previewVisible} footer={null} 
                    onCancel={() => this.setState({ previewVisible: false })}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })
}