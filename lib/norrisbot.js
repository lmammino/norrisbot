'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var Bot = require('slackbots');
var levelup = require('level');

var NorrisBot = function Constructor(settings) {
    this.settings = settings;
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'db');
    this.admins = settings.admins || ['admin'];
    this.adminIds = [];
    this.myId = null;
    this.db = null;
};

util.inherits(NorrisBot, Bot);

NorrisBot.prototype.run = function () {
    NorrisBot.super_.call(this, this.settings);

    this.on('start', this.onStart);
    this.on('message', this.onMessage);
};

NorrisBot.prototype.onStart = function () {
    this.connectDb();
    this.loadAdminIds();
    this.firstRunCheck();
    this.welcomeMessage();
};

NorrisBot.prototype.onMessage = function (message) {
    console.log(this.isDirectMessage(message), this.isAdmin(message.user), message);
};

NorrisBot.prototype.connectDb = function () {
    if (!fs.existsSync(this.dbPath)) {
        try {
            fs.mkdirSync(this.dbPath);
        } catch (ex) {
            console.error('Error: unable to create database folder in ' + '"' + this.dbPath +
                '". Ensure the path is correct and that you have the write rights.');
            process.exit(1);
        }
    }

    this.db = levelup(this.dbPath);
};

NorrisBot.prototype.loadAdminIds = function () {
    var self = this;
    this.admins.forEach(function (username) {
        self.getUser(username).then(function (user) {
            if (user.id) {
                self.adminIds.push(user.id);
            }
        });
    });
};

NorrisBot.prototype.firstRunCheck = function () {
    var self = this;
    self.db.get('info~lastrun', function (err, previousRun) {
        if (err) {
            console.error(err);
        }

        self.db.put('info~lastrun', new Date());
        if (!previousRun) {
            // it's first run, load all the jokes in the database
            console.log('THIS IS THE FIRST RUN');
        } else {
            console.log('THIS IS *****NOT**** THE FIRST RUN');
        }
    });
};

NorrisBot.prototype.welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Hi guys, roundhouse-kick anyone?', {as_user: true});
};

NorrisBot.prototype.isDirectMessage = function (message) {
    return message.type === 'message' &&
        typeof message.channel === 'string' &&
        message.channel[0] === 'D'
        ;
};

NorrisBot.prototype.isAdmin = function (userId) {
    return this.adminIds.indexOf(userId) !== -1;
};

module.exports = NorrisBot;
