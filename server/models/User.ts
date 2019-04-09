
import mongoose from 'mongoose';

import { getUnixTimeStamp } from '../utils/utils';

import { IUserModel } from '../types/Models.d';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    companies: { type: Array(String), default: [] }, 
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp },
        updated_at: { type: Number, default: getUnixTimeStamp }
    }
});

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('users', userSchema);

export {
    User,
    userSchema
};