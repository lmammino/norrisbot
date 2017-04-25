#!/usr/bin/env node

/* eslint no-console: off */

import winston from 'winston';
import chalk from 'chalk';
import norrisbot from './norrisbot';
import pkg from '../package.json';

if (['help', '--help', '-h', 'version', '--version', '-v'].includes(process.argv[2])) {
  console.log(`
    ${chalk.bgMagenta(`norrisbot v${pkg.version}`)}

    Usage:

    ${chalk.cyan('norrisbot')}

    Configuration through environment variables:

    ${chalk.cyan('NORRISBOT_TOKEN')}         - ${chalk.grey('(Mandatory)')} The Slack Bot User OAuth Access Token for your organisation/team
    ${chalk.cyan('NORRISBOT_TRIGGERS')}      - ${chalk.grey('(Optional)')} A coma separated list of words that triggers the bot to reply with a joke (${chalk.grey('Default')}: "Chuck Norris,norrisbot")
    ${chalk.cyan('NORRISBOT_CATEGORIES')}    - ${chalk.grey('(Optional)')} A coma separated list to enable special joke categories like "explicit" and "nerdy" (${chalk.grey('Default')}: "nerdy")
    ${chalk.cyan('NORRISBOT_NO_PICTURES')}   - ${chalk.grey('(Optional)')} If set to TRUE will disable pictures in jokes (${chalk.grey('Default')}: "FALSE")
    ${chalk.cyan('NORRISBOT_MESSAGE_COLOR')} - ${chalk.grey('(Optional)')} The hex color used by the bot to mark it's messages (${chalk.grey('Default')}: "#590088")
  `);
  process.exit(0);
}

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      timestamp() {
        return (new Date()).toISOString();
      },
    }),
  ],
});

logger.cli();

if (!process.env.NORRISBOT_TOKEN) {
  logger.error('You must setup the NORRISBOT_TOKEN environment variable before running the bot');
  process.exit(1);
}

const options = { logger };
if (process.env.NORRISBOT_TRIGGERS) {
  options.triggerOnWords = process.env.NORRISBOT_TRIGGERS.split(',');
}
if (process.env.NORRISBOT_CATEGORIES) {
  options.specialCategories = process.env.NORRISBOT_CATEGORIES.split(',');
}
if (process.env.NORRISBOT_NO_PICTURES) {
  options.usePictures = false;
}
if (process.env.NORRISBOT_MESSAGE_COLOR) {
  options.messageColor = process.env.NORRISBOT_MESSAGE_COLOR;
}

const bot = norrisbot(process.env.NORRISBOT_TOKEN, options);
bot.start();
