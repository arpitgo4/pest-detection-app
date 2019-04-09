
import mongoose from 'mongoose';

import { getUnixTimeStamp } from '../utils/utils';

import { ICompanyModel, } from '../types/Models.d';

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true, unique: true },
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp },
        updated_at: { type: Number, default: getUnixTimeStamp }
    }
});

const Company: mongoose.Model<ICompanyModel> = mongoose.model<ICompanyModel>('companies', companySchema);

export {
    Company,
    companySchema
};