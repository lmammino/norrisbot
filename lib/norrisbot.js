'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var NorrisBot = function Constructor(settings) {
    this.settings = settings;
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    this.userInstance = null;
    this.db = null;
};

util.inherits(NorrisBot, Bot);

NorrisBot.prototype.run = function () {
    NorrisBot.super_.call(this, this.settings);

    this.on('start', this.onStart);
    this.on('message', this.onMessage);
};

NorrisBot.prototype.onStart = function () {
    this.loadBotId();
    this.connectDb();
    this.firstRunCheck();
    this.welcomeMessage();
};

NorrisBot.prototype.onMessage = function (message) {
    if (this.isChatMessage(message) &&
        this.isChannelConversation(message) &&
        !this.isFromNorrisBot(message) &&
        this.isMentioningChuckNorris(message)
    ) {
        this.replyWithRandomJoke(message);
    }
};

NorrisBot.prototype.replyWithRandomJoke = function (originalMessage) {
    var self = this;
    self.db.get('SELECT id, joke FROM jokes ORDER BY used ASC, RANDOM() LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }

        var channel = self.getChannelById(originalMessage.channel);
        self.postMessageToChannel(channel.name, record.joke, {as_user: true});
        self.db.run('UPDATE jokes SET used = used + 1 WHERE id = ?', record.id);
    });
};

NorrisBot.prototype.loadBotId = function () {
    var self = this;
    this.userInstance = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

NorrisBot.prototype.connectDb = function () {
    if (!fs.existsSync(this.dbPath)) {
        console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
        process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
};

NorrisBot.prototype.firstRunCheck = function () {
    // TODO use the table info to see if it's the first time it is run
};

NorrisBot.prototype.welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?', {as_user: true});
};

NorrisBot.prototype.isChatMessage = function (message) {
    return message.type === 'message' && message.text;
};

NorrisBot.prototype.isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C'
        ;
};

NorrisBot.prototype.isMentioningChuckNorris = function (message) {
    return message.text.toLowerCase().indexOf('chuck norris') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1;
};

NorrisBot.prototype.isFromNorrisBot = function (message) {
    return message.user === this.userInstance.id;
};

NorrisBot.prototype.getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = NorrisBot;
