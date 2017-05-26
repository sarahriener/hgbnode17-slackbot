'use strict';

// maps our .env file into process.env
require('dotenv').config();
const bunyan = require('bunyan');

const log = {
    development: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-dev',
            level: 'debug'
        });
    },
    production: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-prod',
            level: 'info'
        });
    },
    test: () => {
        return bunyan.createLogger({
            name: 'slackbot-main-test',
            level: 'fatal'
        });
    }
};

/**
 * As a default, everything is privavte
 * Export functions to make it public
 */
module.exports = {

    slackToken: process.env.SLACK_TOKEN,
    witToken: process.env.WIT_TOKEN,
    serviceTimout: 30,
    botname: 'riener-bot',
    log: (env) => {
        if(env) return log[env]();

        return log[process.env.NODE_ENV || 'development']();
    }

}