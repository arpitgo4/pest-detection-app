
/**
 * Model layer.
 *
 * Interacts with MongoDB.
 */

const DB_CONN = require('../config/mongoose');
import { mongoDBEventEmitter } from '../utils/event-emitters';

import { User, userSchema, } from './User';
import { PestDetection, pestDetectionSchema, } from './PestDetection';

// initialization for the mongodb will go here...
function init() {
    mongoDBEventEmitter.emit('ready', '[mongoose] Connection with MongoDB done');
}

setImmediate(init, 0);

export {
    User,
    PestDetection,
};
