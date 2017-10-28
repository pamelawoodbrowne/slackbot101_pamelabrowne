'use strict';

var giphy = require('giphy-api')(process.env.GIPHY_API_KEY);
var shuffle = require('lodash/shuffle');
var pugs = [];

module.exports = function(bot) {

    bot.registerCommand('pug me', function (bot, params, message, slackbotCallback) {

        var sendResponse = function(pug) {

            var resp = {};

            resp.text = null;

            resp.attachments = [
                {
                    title: typeof pug.title.length !== 'undefined' && pug.title.length > 0 ? pug.title : 'ur pug',
                    image_url: pug.images.original.url,
                }
            ];

            return slackbotCallback(null, resp);
        }

        // pull a pug from the reserves
        if(pugs.length > 0) {
            return sendResponse(pugs.shift());
        }

        // grab some pugs from giphy api
        giphy.search({ q:'pug', limit: 100 }).then(function (apiResponse) {

            // shuffle dem pugs, and save for future requests
            pugs = shuffle(apiResponse.data);

            return sendResponse(pugs.shift());
        });

    });

};
