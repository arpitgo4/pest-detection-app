

import {
    Inspection,
    Company,
} from '../models';

import { userCtrl } from './index';

import { USER_ROLES, GUEST_COMPANY, } from '../utils/constants';
import { IUserModel, ICompanyModel } from 'Models';



export const getCompanies = (user: IUserModel): Promise<Array<string>> => {
    const { role: user_role, _id: user_id } = user;
    const { ADMIN, ADMIN_GUEST, CLIENT_USER, SUPER_USER, GUEST_USER } = USER_ROLES;

    if (user_role === ADMIN || user_role === ADMIN_GUEST || user_role === SUPER_USER)
        return Company.find({})
        .then((company_docs: Array<ICompanyModel>) => company_docs.map(c => c.name));
    else if (user_role === CLIENT_USER)
        return userCtrl.getUser(user_id, { companies: true })
        .then((user: IUserModel) => user.companies);
    else return Promise.resolve([ GUEST_COMPANY ]);
};

export const addCompanies = (companies: Array<string>): Promise<Array<string>> => {

    if (!Array.isArray(companies))
        companies = [];

    return Company.find({ name: { $in: companies } })
    .then((company_docs: Array<ICompanyModel>) => {
        const hash_table = {};
        for (const c of company_docs)
            hash_table[c.name] = c.name;

        const new_companies = companies.reduce((acc, c) => {
            if (!hash_table[c])
                acc.push({ name: c });

            return acc;
        }, []);

        return Company.insertMany(new_companies, { ordered: false, });
    })
    // @ts-ignore
    .then((company_docs: Array<ICompanyModel>) => company_docs.map(c => c.name));
};