
import jsonWebToken from 'jsonwebtoken';
import sha256 from 'crypto-js/sha256';
import Chance from 'chance';
import bcrypt from 'bcryptjs';
import * as moment from 'moment';


import {
    JWT_SECRET,
    USER_JWT_TOKEN_TTL,
} from './constants';

import { IUserModel, } from 'Models';

const UUIDv4_REG_EXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const isValidUUIDv4 = (uuidStr: string) => UUIDv4_REG_EXP.test(uuidStr);

export const getUnixTimeStamp = () => Math.floor(new Date().getTime() / 1000);

const SALT_ROUNDS = 13;

/**
 * $2y$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |                     |
 * |  |  |                     hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |
 * |  |  salt = nOUIs5kJ7naTuTFkBy1veu
 * |  |
 * |  cost-factor = 10 = 2^10 iterations
 * |
 * hash-algorithm = 2y = BCrypt
 */
export const generateHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
    .catch(err => {
        console.log(`[generateHash] Error generating the hash of: ${password}`);
        return Promise.reject(err);
    });
};

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
    .catch(err => {
        console.log('error', err);
        console.log(`[comparePassword] Error comparing the passwords: ${password}, hash: ${hashedPassword}`);
        return Promise.reject(err);
    });
};

const generateJWToken = (data: object, expireTime: string): string => {
    const options = {
        expiresIn: expireTime
    };

    return jsonWebToken.sign(data, JWT_SECRET, options);
};

export const generateUserJWToken = (user: IUserModel, expireTime: string = USER_JWT_TOKEN_TTL) => {
    user = user.toObject();

    // sensitive fields removed from token data
    delete user.meta;
    delete user.__v;

    return generateJWToken(user, expireTime);
};

export const calcHash = (str: string): string => sha256(str).toString();

export const toUUID = (contact_number: string) => new Chance(contact_number).guid();

// parse date string to UNIX seconds timestamp
export const parseDateToTimeStamp = (strDate: string): number => {
    const date = Date.parse(strDate);
    return date/1000;
};

// parses Moment to UNIX seconds timestamp
export const parseMomentToUnixTimeStamp = (m: moment.Moment): number => {
    return Math.floor(m.valueOf()/1000);
};

// parses UNIX seconds timestamp to Moment
export const parseUnixTimestampToMoment = (timestamp: number): moment.Moment => {
    return moment.unix(timestamp);
};

// parses UNIX seconds timestamp to formatted date string
export const parseUnixTimestampToString = (timestamp: number, format: string = 'MM/DD/YYYY hh:mm A'): string => {
    const m = parseUnixTimestampToMoment(timestamp);
    return m.format(format);
};

(function test() {
    // const dateStr = '10/4/18 4:30 PM';
    // console.log('Date String =>', dateStr);
    // const timestamp = parseDateToTimeStamp(dateStr);
    // console.log('timestamp =>', timestamp);

    // console.log(parseUnixTimestampToString(timestamp));
})();