
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

const router = require('express').Router();
import { Response, NextFunction } from 'express';

import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { miscCtrl } from '../controllers';

router.get('/companies', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { user } = req;

    return miscCtrl.getCompanies(user)
    .then((company_names: Array<string>) => {
        res.status(200).json({
            data: company_names.map(name => {
                return {
                    type: 'company',
                    attributes: { name }
                };
            })
        });
    })
    .catch((err: CustomError) => {
        res.status(409).json({
            errors: [
                { message: err.message },
            ]
        });
        next(err);
    });
});


router.post('/companies', (req: JWTRequest, res: Response, next: NextFunction) => {
    const companies = req.body.data.attributes;

    return miscCtrl.addCompanies(companies)
    .then((company_names: Array<string>) => {
        res.status(200).json({
            data: company_names.map(name => {
                return {
                    type: 'company',
                    attributes: { name }
                };
            })
        });
    })
    .catch((err: CustomError) => {
        res.status(409).json({
            errors: [
                { message: err.message },
            ]
        });
        next(err);
    });
});


export default router;