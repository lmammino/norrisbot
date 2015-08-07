'use strict';

// https://github.com/mishk0/slack-bot-api
// http://www.icndb.com/api/

var SlackBot = require('slackbots');
var request = require('request');
var token = process.env.BOT_API_KEY || require('./token'); // get the token from https://<yourorganization>.slack.com/services/new/bot

// create a bot
var bot = new SlackBot({
    token: token,
    name: 'norrisbot'
});

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage

    bot.postMessageToChannel('general', 'Hi guys, roundhouse-kick anyone?');
});