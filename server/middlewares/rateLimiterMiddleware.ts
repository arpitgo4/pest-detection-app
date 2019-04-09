
import { JWTRequest } from 'Interfaces';
import { NextFunction } from 'express';

import * as utils from '../utils/utils';
import * as redis_utils from '../utils/redis-utils';


const rateLimiterMiddleware = (api_hit_limit: number) =>
            (req: JWTRequest, res: Response, next: NextFunction) => {

    const { _id: user_id, } = req.user;
    const api_name = req.baseUrl;

    redis_utils.getRateLimits(user_id)
    .then((rate_limits: any) => {
        console.log(rate_limits);
        const current_timestamp = utils.getUnixTimeStamp();

        if (!rate_limits || !rate_limits[api_name]) {
            rate_limits = { [api_name]: { hit_counter: 1, last_hit_timestamp: current_timestamp, } };
            return redis_utils.updateRateLimit(user_id, rate_limits)
            .then(() => next());
        }

        const { hit_counter, last_hit_timestamp, } = rate_limits[api_name];

        console.log(current_timestamp, last_hit_timestamp,  current_timestamp - last_hit_timestamp);

        if (current_timestamp - last_hit_timestamp >= 10) {
            rate_limits[api_name] = { hit_counter: 1, last_hit_timestamp: current_timestamp, };
            return redis_utils.updateRateLimit(user_id, rate_limits)
            .then(() => next());
        } else {
            if (hit_counter < api_hit_limit) {
                rate_limits[api_name] = { hit_counter: hit_counter + 1, last_hit_timestamp: current_timestamp, };
                return redis_utils.updateRateLimit(user_id, rate_limits)
                .then(() => next());
            } else {
                return next({
                    message: `api limit rate reached!`
                });
            }
        }
    });
};


export default rateLimiterMiddleware;