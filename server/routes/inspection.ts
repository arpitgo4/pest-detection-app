
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

const router = require('express').Router();
import { Response, NextFunction } from 'express';


import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { inspectionCtrl } from '../controllers';
import { IInspectionModel } from 'Models';
import { authorityMiddleware } from '../middlewares';
import { USER_ROLES } from '../utils/constants';


const { ADMIN_GUEST, CLIENT_USER, SUPER_USER, GUEST_USER } = USER_ROLES;

router.get([
        '/',
        '/:start_timestamp/:end_timestamp',
    ],
    authorityMiddleware([ ADMIN_GUEST, CLIENT_USER, GUEST_USER, SUPER_USER ]),
    (req: JWTRequest, res: Response, next: NextFunction) => {

    const { start_timestamp, end_timestamp, } = req.params;
    const { user } = req;

    return inspectionCtrl.getInspections(user, Number(start_timestamp), Number(end_timestamp))
    .then((inspections: Array<IInspectionModel>) => {
        res.status(200).json({
            data: inspections.map(inspection => {
                return {
                    type: 'inspection',
                    id: inspection._id,
                    attributes: inspection,
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

router.get(
    '/:id',
    authorityMiddleware([ ADMIN_GUEST, CLIENT_USER, GUEST_USER, SUPER_USER ]),
    (req: JWTRequest, res: Response, next: NextFunction) => {

    const { user } = req;
    const { id } = req.params;

    return inspectionCtrl.getInspection(user, id)
    .then((inspection: IInspectionModel) => {
        res.status(200).json({
            data: {
                type: 'inspection',
                id: inspection._id,
                attributes: inspection,
            }
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

router.put(
        '/guest',
        authorityMiddleware([ ADMIN_GUEST ]),
        (req: JWTRequest, res: Response, next: NextFunction) => {

    const inspection_ids = req.body.data;
    const to_mark = req.body.mark;

    return inspectionCtrl.updateGuestInspections(inspection_ids, to_mark)
    .then((inspections: Array<IInspectionModel>) => {
        res.status(200).json({
            data: inspections.map(inspection => {
                return {
                    type: 'inspection',
                    id: inspection._id,
                    attributes: inspection,
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