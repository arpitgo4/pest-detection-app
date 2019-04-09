
import { NextFunction } from 'express';

import { JWTRequest } from '../types/Interfaces';


const authorityMiddleware = 
    (required_roles: Array<string>) => 
        (req: JWTRequest, res: Response, next: NextFunction) => {
            const { role } = req.user;

            const user_role_allowed = !!required_roles.find(required_role => role === required_role);

            const { NODE_ENV } = process.env;
            if (NODE_ENV === 'development')
                return next();

            if (!user_role_allowed)
                return next(new Error(`user does not authorise for this api call`));

            return next();
        };


export default authorityMiddleware;