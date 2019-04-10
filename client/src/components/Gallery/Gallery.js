
import React, { Component } from 'react';
import { Button } from 'antd';

import GalleryTile from '../Gallery/GalleryTile';
import PestDetectionModal from '../PestDetection/PestDetectionModal';

export default class Gallery extends Component {

    state={
        modalVisible: false,
    };

    render() {
        const { pest_detections, } = this.props;

        return (
            <div style={{ display: 'block', width: 950, margin: '50px auto' }}>

                <div className="row">
                    <div className="col-md-12">
                        <h3 style={{ display: 'inline-block' }}>Pest Detections</h3>
                        <Button
                            onClick={() => {
                                this.setState({ ...this.state, modalVisible: true, })
                            }} 
                            className="pull-right" 
                            type="primary">
                            Create Pest Detection
                        </Button>
                    </div>
                </div>

                {
                    pest_detections.length === 0 ?
                        <p>No Pest Detections Found!</p> : this._renderPestDetections(pest_detections)
                }

                <PestDetectionModal
                    modalVisible={this.state.modalVisible} 
                    onClose={() => this.setState({ modalVisible: false })}
                    onOk={this.onModalOk.bind(this)}
                />
            </div>
        );
    }
    
    onModalOk(pest_name, files) {
        const { createPestDetection, } = this.props;
        this.setState({ modalVisible: false, });

        const [ image_file, ] = files;

        createPestDetection(pest_name, image_file.originFileObj);
    }

    _renderPestDetections(pest_detections) {
        return (
                pest_detections.map(p =>
                        <GalleryTile key={p._id} pest_detection={p} />
                )
        );
    }
}