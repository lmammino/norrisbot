import pino from 'pino';
import norrisbot from './norrisbot';

const logger = pino();

if (!process.env.SLACK_BOT_TOKEN) {
  logger.error('You must setup the SLACK_BOT_TOKEN environment variable before running the bot');
  logger.exit(1);
}

const bot = norrisbot(process.env.SLACK_BOT_TOKEN, { logger });
bot.start();
