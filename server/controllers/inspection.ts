
import {
    Inspection,
} from '../models';
import { IInspectionModel, IUserModel } from 'Models';

import { preprocessInspection } from '../utils/inspection-utils';
import { miscCtrl, } from './index';
import { USER_ROLES, GUEST_COMPANY } from '../utils/constants';
import { FileObject } from 'Interfaces';


export const getInspections = (user: IUserModel, start_timestamp?: number, end_timestamp?: number): Promise<Array<IInspectionModel>> => {
    const query = { $and: [] };

    // @ts-ignore
    return miscCtrl.getCompanies(user)
    // @ts-ignore
    .then((companies: Array<string>) => {
        if (start_timestamp)
            query.$and.push({ 'inspection.timestamp': { $gte: start_timestamp } });
        if (end_timestamp)
            query.$and.push({ 'inspection.timestamp': { $lte: end_timestamp } });

        if (user.role === USER_ROLES.GUEST_USER)
            query.$and.push({ guest_visible: true });
        else if (companies && companies.length > 0)
            query.$and.push({ 'company.name': { $in: companies } });

        console.log('query', query);

        return Inspection.find(query);
    })
    .then((inspections: Array<IInspectionModel>) => {
        // guest users are prohibited from seeing company name
        if (user.role === USER_ROLES.GUEST_USER)
            return inspections.map((i: IInspectionModel) => {
                i = i.toObject();
                i.company.name = GUEST_COMPANY;
                return i;
            });

        return inspections;
    });
};


export const getInspection = (user: IUserModel, inspection_id: string): Promise<IInspectionModel> => {
    return Inspection.findOne({ _id: inspection_id })
    // @ts-ignore
    .then((inspection: IInspectionModel) => {
        if (!inspection)
            return Promise.reject({
                message: `Inspection not found with id: ${inspection_id}`
            });

        return inspection;
    })
    .then((inspection: IInspectionModel) => {
        inspection = inspection.toObject();

        // guest users are prohibited from seeing company name
        if (user.role === USER_ROLES.GUEST_USER)
            inspection.company.name = GUEST_COMPANY;

        return inspection;
    });
};


export const createInspection = (inspection: IInspectionModel, image_file?: FileObject): any => {
    return preprocessInspection(inspection, image_file)
    .then((inspection: IInspectionModel) => {
        return Promise.all([
            Inspection.create(inspection),
            miscCtrl.addCompanies([ (inspection.company && inspection.company.name) ]),
        ]);
    })
    .then(([ inspection, _ ]: [ IInspectionModel, Array<string> ]) => {
        return inspection;
    });
};


export const updateGuestInspections = (inspection_ids: Array<string>, to_mark: boolean = true) => {
    const update_promises = inspection_ids.map((inspection_id: string) => {
        return Inspection.findOneAndUpdate(
                        { _id: inspection_id },
                        { $set: { guest_visible: to_mark } },
                        { new: true, });
    });

    // @ts-ignore
    return Promise.all(update_promises);
};