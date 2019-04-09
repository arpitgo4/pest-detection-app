
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

const router = require('express').Router();
import { Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';

import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { inspectionCtrl, } from '../controllers';
import { IInspectionModel } from 'Models';
import { UPLOAD_DESTINATION } from '../utils/constants';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, UPLOAD_DESTINATION);
    },
    filename: (req, file, cb) => {
        cb(undefined, `${file.originalname}`);
    },
});
const multer_upload = multer({ storage });

router.post('/', multer_upload.any(), (req: JWTRequest, res: Response, next: NextFunction) => {
    if (!req.files)
        return next({ message: `No image and json as form data!` });

    // @ts-ignore
    const image = req.files.find(file => file.fieldname === 'image');
    // @ts-ignore
    const json = req.files.find(file => file.fieldname === 'json');

    if (!image)
        return next({ message: `Image file needed, send it as form data!` });
    if (!json)
        return next({ message: `Json file needed, send it as form data!` });

    const inspection_str = fs.readFileSync(path.resolve(json.path)).toString();
    const inspection: IInspectionModel = JSON.parse(inspection_str);

    // @ts-ignore
    delete inspection.inspection.image_file;    // deleting image link embedded in inspection, will be replaced by our own.

    inspectionCtrl.createInspection(inspection, image)
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


export default router;