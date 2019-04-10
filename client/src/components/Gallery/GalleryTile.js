

import React from 'react';

import * as utils from '../../config/utils';


const GalleryTile = ({
    pest_detection
}) => (
    <div style={{ display: 'inline-block', margin: 15, }}>
        <div id="image">
            <img src={pest_detection.image_url} height={200} width={200} />
        </div>
        <div id="content" style={{ margin: '10px 0' }} className="text-center">
            <p>Pest Name: {pest_detection.pest_name}</p>
            <p>Pest Detection Ratio: {pest_detection.detection_ratio}</p>
            <p>Created At: {utils.parseUnixTimestampToString(pest_detection.meta.created_at, 'DD-MM-YYYY')}</p>
        </div>
    </div>
);


export default GalleryTile;