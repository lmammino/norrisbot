'use strict';

var NorrisBot = require('../lib/norrisbot');

// get the token from https://<yourorganization>.slack.com/services/new/bot
var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var admins = process.env.BOT_ADMINS;
var name = process.env.BOT_NAME || 'norrisbot';

var norrisbot = new NorrisBot({
    token: token,
    dbPath: dbPath,
    admins: admins,
    name: name
});

norrisbot.run();
