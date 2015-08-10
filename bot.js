'use strict';

// https://github.com/mishk0/slack-bot-api

var path = require('path');
var fs = require('fs');
var SlackBot = require('slackbots');
var levelup = require('level');

// get the token from https://<yourorganization>.slack.com/services/new/bot
var token = process.env.BOT_API_KEY || require('./token');
var channel = process.env.BOT_CHANNEL || 'general';
var dbPath = process.env.BOT_DB_PATH || path.resolve(__dirname, 'db');

var db = null;

// create a bot
var bot = new SlackBot({
    token: token,
    name: 'norrisbot'
});

bot.on('start', function () {
    if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath);
    }

    db = levelup(dbPath);
    db.put('info~lastrun', new Date());

    // more information about additional params https://api.slack.com/methods/chat.postMessage
    bot.postMessageToChannel(channel, 'Hi guys, roundhouse-kick anyone?', {as_user: true});
});

bot.on('message', function (data) {
    console.log(data);
});
