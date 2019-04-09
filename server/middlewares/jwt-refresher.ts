
import jwt from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
import { JWTRequest, } from 'Interfaces';
import { userCtrl } from '../controllers';

import { USER_JWT_TOKEN_TTL } from '../utils/constants';
import * as utils from '../utils/utils';
import { IUserModel } from 'Models';


const jwtRefresher = (req: JWTRequest, res: Response, next: NextFunction) => {
    const _json = res.json;

    // @ts-ignore
    res.json = (data: object) => {
        const { _id } = req.user;

        userCtrl.getUser(_id)
        .then((user: IUserModel) => {
            if (!user)
                return next({ message: `Invalid User, please login again!` });

            const interceptedData = {
                ...data,
                meta: {
                    // create refreshed token from `admin's authorities` from DB.
                    token: utils.generateUserJWToken(user, USER_JWT_TOKEN_TTL)
                }
            };

            _json.call(res, interceptedData);
        });
    };

    next();
};


export default jwtRefresher;