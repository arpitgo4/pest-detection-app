
import { Document } from 'mongoose';

export interface IUserModel extends Document {
    _id: string;
    company: string; 
    name: string;
    email: string;
    mobile: string;
    meta: {
        created_at: number;
        updated_at: number;
    }
}

export interface IPestDetectionModel extends Document {
    pest_name: string;
    detection_ratio: number;
    image_url: string;
    meta: {
        created_at: number;
        created_by: string;
    },
}