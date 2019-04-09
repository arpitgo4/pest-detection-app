
import chalk from 'chalk';

import redisClient from '../config/redis-client';

import { REDIS_RATE_LIMIT_HASH, } from './constants';
import { CustomError } from 'Interfaces';
import * as utils from './utils';



export const updateRateLimit = (user_id: string, rate_limits: any): Promise<any> => {
    return redisClient.hset(REDIS_RATE_LIMIT_HASH, user_id, JSON.stringify(rate_limits))
    .catch((err: CustomError) => {
        console.log(chalk.red(`[redis] Error saving metar info: ${err.message}`));

        return Promise.reject(err);
    });
};

export const getRateLimits = (user_id: string): Promise<any> => {
    return redisClient.hget(REDIS_RATE_LIMIT_HASH, user_id)
    .then((rate_limits_string: string) => {
        if (!rate_limits_string)
            return undefined;

        const rate_limits = JSON.parse(rate_limits_string);
        return rate_limits;
    });
};

export const flushAll = (): void => {
    return redisClient.flushall()
    .then(() => {
        console.log(chalk.red(`[redis] All data flushed!`));
    });
};
