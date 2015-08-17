'use strict';

/**
 * NorrisBot launcher script.
 *
 * @type {NorrisBot|exports|module.exports}
 */

var NorrisBot = require('../lib/norrisbot');

// get the token from https://<yourorganization>.slack.com/services/new/bot
var token = process.env.BOT_API_KEY || require('../token');
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME || 'norrisbot';

var norrisbot = new NorrisBot({
    token: token,
    dbPath: dbPath,
    name: name
});

norrisbot.run();
