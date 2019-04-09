
import { Request } from 'express';
import { IUserModel } from 'Models';

export interface CustomError extends Error {
    err: string;
    message: string;
}

export interface JWTRequest extends Request {
    user: IUserModel;
    meta: object;
}

export interface FileObject {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}