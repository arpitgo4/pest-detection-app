
import chalk from 'chalk';


const loggerMiddleware = (err, req, res, next) => {
    console.log(chalk.red(`[logger-middleware] Error logged: ${req.method} ${req.url} : body => ${JSON.stringify(req.body || {})}, error => ${err.message}, stack trace: ${console.trace()}`));
    next(err);
};


export default loggerMiddleware;