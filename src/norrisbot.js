import { RtmClient, WebClient, RTM_EVENTS, CLIENT_EVENTS } from '@slack/client';
import {
  isMessage,
  isMessageToChannel,
  isFromUser,
  messageContainsText,
  filterJokesByCategories,
  pickRandom,
} from './utils';
import jokes from './data/jokes';
import pictures from './data/pictures';

const defaultOptions = {
  triggerOnWords: ['Chuck Norris', 'norrisbot'],
  specialCategories: ['nerdy'],
  messageColor: '#590088',
  usePictures: true,
  logger: console,
  rtmOptions: {},
};

const norrisbot = (botToken, options = {}) => {
  let botId;

  const opt = Object.assign({}, defaultOptions, options);
  const rtm = new RtmClient(botToken, opt.rtmOptions);
  const web = new WebClient(botToken);

  const allowedJokes = filterJokesByCategories(jokes, opt.specialCategories);
  rtm.on(RTM_EVENTS.MESSAGE, (event) => {
    if (
      isMessage(event) &&
      isMessageToChannel(event) &&
      !isFromUser(event, botId) &&
      messageContainsText(event, opt.triggerOnWords)
    ) {
      const joke = pickRandom(allowedJokes);
      const msgOptions = {
        as_user: true,
        attachments: [
          {
            color: opt.messageColor,
            title: joke.text,
          },
        ],
      };

      if (opt.usePictures) {
        msgOptions.attachments[0].image_url = pickRandom(pictures);
      }

      web.chat.postMessage(event.channel, '', msgOptions);
      opt.logger.info(`Posting message to ${event.channel}`, msgOptions);
    }
  });

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    botId = rtmStartData.self.id;
    opt.logger.info(`Logged in as ${rtmStartData.self.name} (id: ${botId}) of team ${rtmStartData.team.name}`);
  });

  return {
    rtm,
    web,
    start() { rtm.start(); },
  };
};

export default norrisbot;
