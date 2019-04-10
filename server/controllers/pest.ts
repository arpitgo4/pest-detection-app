
/**
 * Controller layer
 *
 * Interacts with model and business logic for
 * the request goes here.
 */


import {
    PestDetection
} from '../models';

import * as constants from '../utils/constants';
import { IPestDetectionModel } from 'Models';



export const getPestDetections = (user_id: string, pest_name: string, detection_ratio: string) => {
    if (!detection_ratio)
        detection_ratio = '';

    const lower_bound = parseFloat(detection_ratio.split('-')[0]) || 0.0;
    const upper_bound = parseFloat(detection_ratio.split('-')[1]) || 1.0;

    return PestDetection.find({
        pest_name: { $regex: pest_name },
        detection_ratio: { $gte: lower_bound, $lte: upper_bound, },
        'meta.created_by': user_id,
    })
    .then((pest_detections: Array<IPestDetectionModel>) => {
        if (!pest_detections)
            return [];

        return pest_detections;
    });
};


export const createPestDetection = (user_id: string, pest_name: string, image_path: string) => {
    return PestDetection.create({
        pest_name,
        detection_ratio: parseFloat(Math.random().toFixed(1)),
        image_url: `${constants.SERVER_DOMAIN}/${image_path}`,
        meta: {
            created_by: user_id,
        }
    });
};