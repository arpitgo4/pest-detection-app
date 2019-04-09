
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */


const router = require('express').Router();
import { Response, NextFunction, } from 'express';

import * as utils from '../utils/utils';

import { IUserModel } from '../types/Models';
import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { userCtrl } from '../controllers';


router.post('/token', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { mobile, } = req.body.data.attributes;

    return userCtrl.getUserByAuth(mobile)
    .then((user: IUserModel) => Promise.all([ utils.generateUserJWToken(user), user, ]))
    .then(([ jwToken, user ]: [ string, IUserModel ]) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user,
            },
            meta: {
                token: jwToken
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


router.post('/user', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { name, dob, company, email, mobile, } = req.body.data.attributes;

    return userCtrl.createUser(name, dob, company, email, mobile)
    .then((user: IUserModel) => Promise.all([ utils.generateUserJWToken(user), user, ]))
    .then(([ jwToken, user ]: [ string, IUserModel ]) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user,
            },
            meta: {
                token: jwToken
            }
        });
    })
    .catch((err: CustomError) => next(err));
});


export default router;