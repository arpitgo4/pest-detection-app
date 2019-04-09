
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
import { multerMiddleware, rateLimiterMiddleware, } from '../middlewares';


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { _id: user_id, } = req.user;
    const { pest_name, detection_ratio, } = req.query;

    return pestCtrl.getPestDetections(user_id, pest_name, detection_ratio)
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


const api_rate_limit = Number(process.env.POST_PEST_API_RATE_LIMIT);
router.post('/', rateLimiterMiddleware(api_rate_limit),
                multerMiddleware.any(),
                (req: JWTRequest, res: Response, next: NextFunction) => {

    const { _id: user_id, } = req.user;

    if (!req.files)
        return next({ message: `No pest image found as form data!` });

    // @ts-ignore
    const pest_image = req.files.find(f => f.fieldname === 'pest_image');
    const { pest_name, } = req.body;

    return pestCtrl.createPestDetection(user_id, pest_name, pest_image.path)
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