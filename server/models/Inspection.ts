
import { Schema, model, Model, } from 'mongoose';

import { getUnixTimeStamp } from '../utils/utils';
import { INSPECTION_DUMMY_IMAGE, } from '../utils/constants';
import { IInspectionModel } from 'Models';

const inspectionSchema = new Schema({
    company: {
        type: Object({
            name: { type: String, required: true, index: true, },
        }),
    },
    site: {
        type: Object({
            name: { type: String, default: 'N/A', index: true, },
            lat: { type: Number, default: -1, index: true, },
            long: { type: Number, default: -1, index: true, },
            lsd: { type: String, default: 'N/A', index: true, },
            uid: { type: String, default: 'N/A', index: true, },
        }),
    },
    facility: {
        type: Object({
            name: { type: String, default: 'N/A', index: true, },
            lat: { type: Number, default: -1, index: true, },
            long: { type: Number, default: -1, index: true, },
            lsd: { type: String, default: 'N/A', index: true, },
            uid: { type: String, default: 'N/A', index: true, },
        }),
    },
    inspection: {
        type: Object({
            date: { type: String, required: true, index: true, },
            time: { type: Number, required: true, index: true,  },
            timestamp: { type: Number, required: true, },
            name: { type: String, required: true, },
            image_url: { type: String, default: INSPECTION_DUMMY_IMAGE },
            cam_direction: { type: Number, default: -1, },
            wind_speed: { type: Number, default: -1, }, // (in m/s or other default units of measurement)
            wind_speed_units: { type: String, default: 'N/A', },
            wind_direction: { type: Number, default: -1, }, //  (in degrees measured clockwise from due North)
            leaks: {
                type: Array({
                    number: { type: Number, required: true, index: true, },
                    pressure: { type: Number, default: -1, },
                    pressure_units: { type: String, default: 'N/A', },
                    mass_rate: { type: Number, default: -1, },
                    mass_rate_units: { type: String, default: 'N/A', },
                    vol_rate: { type: Number, default: -1, },
                    vol_rate_units: { type: String, default: 'N/A', },
                }),
            },
        }),
    },
    inspector: {
        type: Object({
            company: { type: String, default: 'N/A', required: true, },
            name: { type: String, default: 'N/A', required: true, },
            certification: { type: String, default: 'N/A', },
        }),
    },
    guest_visible: { type: Boolean, default: false, },
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp, },
        updated_at: { type: Number, default: -1, },
    }
});

const Inspection: Model<IInspectionModel> = model<IInspectionModel>('inspections', inspectionSchema);


export {
    Inspection,
    inspectionSchema,
};