
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */


import userRouter from './user';
import authRouter from './auth';
import inspectionRouter from './inspection';
import miscRouter from './misc';
import uploadRouter from './upload';

export {
    userRouter,
    authRouter,
    inspectionRouter,
    miscRouter,
    uploadRouter,
};
