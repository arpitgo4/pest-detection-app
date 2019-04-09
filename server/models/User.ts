
import mongoose from 'mongoose';

import { getUnixTimeStamp } from '../utils/utils';

import { IUserModel } from '../types/Models.d';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mobile: { type: String, required: true, unique: true, index: true, },
    email: { type: String, required: true, unique: true, },
    name: { type: String, required: true, },
    dob: { type: Number, required: true, },
    company: { type: String, required: true },
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