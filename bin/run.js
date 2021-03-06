
/**
 * Start script
 */
'use strict';

const config = require('../config');
// load config once
const log = config.log();

const service = require('../server/service')(config);
const serviceRegistry = service.get('serviceRegistry');
const SlackClient = require('../server/SlackClient');
const WitClient = require('../server/WitClient');

const http = require('http');

// use express service for server
const server = http.createServer(service);

const witClient = new WitClient(config.witToken);

const slackClient = new SlackClient(config.slackToken, witClient, config.botname, 'info', log, serviceRegistry);

// start server after a connection to Slack is established
slackClient.start(() => {
    server.listen(process.env.PORT || 3000);
});

server.on('listening', function() {
    // use back ticks to use string interpolation
    log.info(`Slackbot is listening on ${server.address().port} in ${service.get('env')} mode`);
});