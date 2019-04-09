

import fs from 'fs';
import path from 'path';
import multer from 'multer';

import { UPLOAD_DESTINATION } from '../utils/constants';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(undefined, UPLOAD_DESTINATION);
    },
    filename: (req, file, cb) => {
        cb(undefined, `${file.originalname}`);
    },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;