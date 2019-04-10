
import { pestApiFactory } from '../config/api-factory';

import { showErrorNotification } from './index.action-creator';
import * as utils from '../config/utils';



export const getPestDetections = (pest_name, d_r_lower_bound, d_r_upper_bound) => {
    return dispatch => {
        const query_params = { pest_name, detection_ratio: `${d_r_lower_bound}-${d_r_upper_bound}`, };
        const api = pestApiFactory.get(pestApiFactory.API_TABLE.GET_PEST_DETECTIONS, undefined, query_params);

        return fetch(api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data, } = resJson;

            dispatch({
                type: `SAVE_PEST_DETECTIONS`,
                payload: { 
                    pest_detections: data.map(d => d.attributes),
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};


export const createPestDetection = (pest_name, pest_image) => {
    return dispatch => {
        const api = pestApiFactory.get(pestApiFactory.API_TABLE.POST_PEST_DETECTION);

        const formData = new FormData();
        formData.append('pest_image', pest_image);
        formData.append('pest_name', pest_name);

        return fetch(api.url, { 
            method: api.type,
            body: formData,
        })
        .then(utils.errorHandler)
        .then(resJson => {
            const { data, } = resJson;

            dispatch({
                type: `SAVE_PEST_DETECTION`,
                payload: { 
                    pest_detection: data.attributes,
                }
            });
        })
        .catch(err => dispatch(showErrorNotification(err.message)));
    };
};