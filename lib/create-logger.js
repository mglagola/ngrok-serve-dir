const chalk = require('chalk');

function createLogger (logFn = console.log, useUTCTimeFormat = false) {
    return {
        info: logFn,
        request: (req, res, error) => {
            const date = useUTCTimeFormat ? new Date().toUTCString() : new Date();
            if (error) {
                logFn(
                    '[%s] "%s %s" Error (%s): "%s"',
                    date, chalk.red(req.method), chalk.red(req.url),
                    chalk.red(error.status.toString()), chalk.red(error.message)
                );
            }
            else {
                logFn(
                    '[%s] "%s %s" "%s"',
                    date, chalk.cyan(req.method), chalk.cyan(req.url),
                    req.headers['user-agent']
                );
            }
        },
    };
}

module.exports = createLogger;