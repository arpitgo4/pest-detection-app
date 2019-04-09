
/**
 * Controller layer
 *
 * Interacts with model and business logic for
 * the request goes here.
 */


import {
    User
} from '../models';

import { IUserModel } from 'Models';


export const getUser = (_id: string, projection: object = {}): Promise<IUserModel> => {
    return User.findOne({ _id }, projection)
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({
                message: `user not found ${_id}`
            });

        return user;
    });
};

export const getUserByAuth = (mobile: string): Promise<IUserModel> => {
    return User.findOne({ mobile })
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `mobile number: ${mobile} do not exists`});

        return Promise.resolve(user);
    });
};

export const getUsers = (): Promise<Array<IUserModel>> => {
    return User.find({}, { password: false, })
    .then((users: Array<IUserModel>) => users ? users : []);
};

export const createUser = (name: string, dob: number, company: string, email: string, mobile: string): Promise<IUserModel> => {
    const user: any = {
        name, dob, company, email, mobile,
    };

    return User.create(user);
};