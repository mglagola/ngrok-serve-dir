#!/usr/bin/env node

const ngrok = require('ngrok');
const chalk = require('chalk');
const meow = require('meow');
const httpServer = require('http-server');
const createLogger = require('./lib/create-logger');

const DEFAULT_PORT = 4000;

const cli = meow(`
  Usage
    $ ngrok-serve <path/to/directory>
    $ ngrok-serve <path/to/directory> --port=<PORT>

  Options
    -p, --port Sets the desired port 

  Examples
    $ ngrok-serve .
    $ ngrok-serve ./public/static
    $ ngrok-serve ./public/static --port=4000
`, {
    alias: {
        p: 'port',
    },
});

function serveDirectory (options = {}, port) {
    const server = httpServer.createServer(options);
    const host = '0.0.0.0';
    server.listen(port, host);
    return server;
}

function main (dir, { port = DEFAULT_PORT } = {}) {
    const logger = createLogger();

    console.log('Serving directory:', chalk.cyan(dir), 'on port', chalk.cyan(port));
    serveDirectory({ root: dir, logFn: logger.request }, port);

    console.log('Launching ngrok');
    return ngrok
        .once('connect', url => {
            console.log('Running ngrok on:', chalk.magenta.underline(url));
        })
        .on('error', error => {
            console.error(chalk.red(error.message));
        })
        .on('disconnect', () => {
            console.error(chalk.red('ngrok disconnected, aborting!'));
            process.exit(1);
        })
        .connect(port);
}

const dir = cli.input[0] || process.cwd();
main(dir, cli.flags);
