
/**
 * Controller layer
 *
 * Interacts with model and business logic for
 * the request goes here.
 */

import { promisify } from 'util';
import request, { Request, Response } from 'request';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

import {
    User
} from '../models';

import * as utils from '../utils/utils';
import { IUserModel } from 'Models';
import { USER_ROLES, GUEST_COMPANY, } from '../utils/constants';
import { miscCtrl, } from './index';


export const getUser = (_id: string, projection: object = {}): Promise<IUserModel> => {
    return User.findOne({ _id }, projection)
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({
                message: `user not found ${_id}`
            });

        delete user.password;

        return user;
    });
};

export const getUserByAuth = (username: string, password: string): Promise<IUserModel> => {
    return User.findOne({ username })
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `username: ${username} do not exists`});
        return Promise.resolve(user);
    })
    .then((user: IUserModel) => Promise.all([ utils.comparePassword(password, user.password), user ]))
    .then(([ passwordMatched, user ]: [ any, IUserModel ]) => {
        if (!passwordMatched)
            return Promise.reject({
                message: `username/password may be incorrect`
            });

        delete user.password;

        return Promise.resolve(user);
    });
};

export const getUsers = (): Promise<Array<IUserModel>> => {
    return User.find({}, { password: false, })
    .then((users: Array<IUserModel>) => users ? users : []);
};

export const createUser = (user: IUserModel): Promise<IUserModel> => {
    return utils.generateHash(user.password)
    .then((hashed_password: string) => {
        const new_user = Object.assign({}, user, { 
                            password: hashed_password,
                            companies: (
                                user.role === USER_ROLES.GUEST_USER ? 
                                    [ GUEST_COMPANY ] : user.companies
                            )
                        });

        return Promise.all([
            User.create(new_user),
            miscCtrl.addCompanies(user.companies),
        ]);
    })
    .then(([ user, companies ]: [ IUserModel, Array<string> ]) => {
        user = user.toObject();
        delete user.password;

        return user;
    });
};

export const updateUser = (user: IUserModel): Promise<IUserModel> =>  {
    return miscCtrl.addCompanies(user.companies)
    .then((companies: Array<string>) => {
        let update_promise = Promise.resolve(user);
        if (user.password)
            update_promise = utils.generateHash(user.password)
            .then((hashed_password: string) => Object.assign({}, user, { password: hashed_password }));

        return update_promise;
    })
    // @ts-ignore
    .then((user: IUserModel) => User.findOneAndUpdate(
        { _id: user._id },
        { $set: { ...user, 'meta.updated_at': utils.getUnixTimeStamp() } },
        { new: true, upsert: true, projection: { password: false, } }
    ));
};

export const removeUser = (_id: String): Promise<IUserModel> => {
    return User.findOneAndRemove({ _id })
    .then((user: IUserModel) => {
        user = user.toObject();
        delete user.password;

        return user;
    });
};