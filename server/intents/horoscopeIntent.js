'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, registry, log, cb) {

    if(intentData.intent[0].value !== 'horoscope') {
        return cb(new Error('Expected horoscope intent but got ' + intentData.intent[0].value));
    }

    const sunsign = intentData.sunsign[0].value.replace(/,.?riener\-bot/i, '');;

    const service = registry.get('horoscope');
    if(!service) return cb(false, 'No service available');


    // call own service
    request.get(`http://${service.ip}:${service.port}/service/${sunsign}`)
    .then((res) => {
        if(!res.body.result) return cb('Error with horoscope service');

         return cb(null, `You, my dear ${sunsign} have an interesting horoscope today: \n ${res.body.result}`);
    });
}