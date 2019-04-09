
import chalk from 'chalk';
// second arg for promise factory.
import redisFactory from 'promise-redis';

const redis = redisFactory();

import { redisEventEmitter } from '../utils/event-emitters';

const { REDIS_HOST, } = process.env;
if (!REDIS_HOST) {
    console.log(chalk.red.bold(`[redis] $REDIS_HOST environment variable: ${REDIS_HOST}`));
    process.exit(1);
}

const [ REDIS_URL, REDIS_PORT ] = REDIS_HOST.split(':');

const REDIS_CONFIG = {
    host: REDIS_URL,
    port: REDIS_PORT,
    socket_keepalive: true
};

const rdClient = redis.createClient(REDIS_CONFIG);

rdClient.on('connect', () => {
    console.log(chalk.green('[redis] Initializing Redis'));
    initializeRedis()
    .then(() => console.log(chalk.red('[redis] Redis Initialized')))
    .then(() => redisEventEmitter.emit('ready'));
});

const initializeRedis = (): Promise<any> => {
    return Promise.resolve();
};

export default rdClient;