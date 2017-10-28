'use strict';

var shuffle = require('lodash/shuffle');

let responses = [
    'Welcome :user:! :wave:',
    'Hey :user:! Great to see you! :wave:',
    'oh hai! Glad you are here :user:! :wave:',
];

var randomResponses = [];

function getRandomResponse(username) {

    if(!randomResponses.length > 0) {
        randomResponses = shuffle(responses);
    }

    // do a string replacement on :user: with username
    randomResponses.replace(:user:, username);

    return randomResponses.shift();
}

module.exports = function(bot) {

    bot.registerListener('joined', function(bot, message, slackbotCallback) {

        var resp = {};
        let pattern = new RegExp('<@(.*)> has joined the group');
        var theMatch = message.text.match(pattern);

        let newPerson = '<@'+theMatch[1]+'>';

        console.log(theMatch,newPerson);

        if (!theMatch) {
            return;
        }

        resp.text = getRandomResponse();
        slackbotCallback(null, resp);
    });

};
