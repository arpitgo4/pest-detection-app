
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */


const router = require('express').Router();
import { Response, NextFunction, } from 'express';

import { IPestDetectionModel, } from '../types/Models';
import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { pestCtrl, } from '../controllers';



router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { pest_name, detection_ratio, } = req.query;

    return pestCtrl.getPestDetections(pest_name, detection_ratio,)
    .then((pests: Array<IPestDetectionModel>) => {
        res.status(200).json({
            data: pests.map(p => {
                return {
                    type: 'pest-detection',
                    id: p._id,
                    attributes: p
                };
            })
        });
    })
    .catch((err: CustomError) => next(err));
});

router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { _id: user_id, } = req.user;
    const { pest_name, } = req.body.data.attributes;

    const image_url = '';
    return pestCtrl.createPestDetection(user_id, pest_name, image_url)
    .then((pest: IPestDetectionModel) => {
        res.status(200).json({
            data: {
                type: 'pest-detection',
                id: pest._id,
                attributes: pest,
            }
        });
    })
    .catch((err: CustomError) => next(err));
});



export default router;