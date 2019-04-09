
import { Schema, model, Model, } from 'mongoose';

import { getUnixTimeStamp } from '../utils/utils';
import { INSPECTION_DUMMY_IMAGE, } from '../utils/constants';
import { IPestDetectionModel } from 'Models';

const pestDetectionSchema = new Schema({
    pest_name: { type: String, requried: true, },
    detection_ratio: { type: Number, required: true, },
    image_url: { type: String, required: false, deafult: INSPECTION_DUMMY_IMAGE, },
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp, },
        created_by: { type: String, required: true, },
    },
});

const PestDetection: Model<IPestDetectionModel> = model<IPestDetectionModel>('pest_detections', pestDetectionSchema);


export {
    PestDetection,
    pestDetectionSchema,
};