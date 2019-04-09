
import { Document } from 'mongoose';

export interface IUserModel extends Document {
    _id: string;
    username: string;
    companies: Array<string>; 
    role: string;
    name: string;
    email: string;
    password: string;
    meta: {
        created_at: number;
        updated_at: number;
    }
}

export interface IInspectionModel extends Document {
    _id: string,
    company: { 
        name: string 
    };
    site: {
        lat: number;
        long: number;
        lat_long: number;
    };
    facility: {
        lat: number;
        long: number;
        lat_long: number;
    };
    inspection: {
        date: string;
        time: string;
        timestamp: number;
        name: string;
        image_url: string;
    };
    inspector: object;
    wind_speed: string;
    wind_direction: string;
    guest_visible: boolean;
    meta: {
        created_at: Number;
        updated_at: Number;
    }
}

export interface ICompanyModel extends Document {
    name: string;
    meta: {
        created_at: Number;
        updated_at: Number;
    }
}