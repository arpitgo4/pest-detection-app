
/**
 * Model layer.
 *
 * Interacts with MongoDB.
 */

const DB_CONN = require('../config/mongoose');
import { mongoDBEventEmitter } from '../utils/event-emitters';

import { User, userSchema, } from './User';
import { Inspection, inspectionSchema, } from './Inspection';
import { Company, companySchema, } from './Company';

import * as utils from '../utils/utils';
import * as constants from '../utils/constants';
import { CustomError } from 'Interfaces';
import { IUserModel } from 'Models';

// initialization for the mongodb will go here...
function init() {
    const { userCtrl, inspectionCtrl } = require('../controllers');

    const admin_promise = User.findOne({ username: 'admin' })
    .then((user: IUserModel) => {
        if (!user)
            return userCtrl.createUser({
                username: 'admin',
                password: 'admin',
                email: 'admin@wipiway.com',
                name: 'Administrator',
                role: constants.USER_ROLES.ADMIN,
            });

        return Promise.resolve();
    });

    // const dummy_inspection_promise = Inspection.count({})
    // // @ts-ignore
    // .then((count: number) => {
    //     if (count < 10)
    //         return inspectionCtrl.createInspection(constants.dummy_inspection);

    //     return Promise.resolve();
    // });

    return Promise.all([ admin_promise, ]) // dummy_inspection_promise, ])
    .then(() => mongoDBEventEmitter.emit('ready', '[mongoose] Connection with MongoDB done'))
    .catch((err: CustomError) => mongoDBEventEmitter.emit('error', `[mongoose] Error creating connection with MongoDB: ${err.message}`));
}

setImmediate(init, 0);

export {
    User,
    Inspection,
    Company,
};
