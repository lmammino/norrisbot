import { RtmClient, RTM_EVENTS, CLIENT_EVENTS } from '@slack/client';
import {
  isMessage,
  isMessageToChannel,
  isFromUser,
  messageContainsText,
  filterJokesByCategories,
  pickRandomJoke,
} from './utils';
import jokes from './data/jokes';

const defaultOptions = {
  triggerOnWords: ['Chuck Norris', 'norrisbot'],
  specialCategories: ['nerdy'],
  logger: console,
  rtmOptions: {},
};

const norrisbot = (botToken, options = {}) => {
  let botId;

  const opt = Object.assign({}, defaultOptions, options);
  const rtm = new RtmClient(botToken, opt.rtmOptions);
  const allowedJokes = filterJokesByCategories(jokes, opt.specialCategories);
  rtm.on(RTM_EVENTS.MESSAGE, (event) => {
    if (
      isMessage(event) &&
      isMessageToChannel(event) &&
      !isFromUser(event, botId) &&
      messageContainsText(event, opt.triggerOnWords)
    ) {
      const joke = pickRandomJoke(allowedJokes);
      rtm.sendMessage(joke.text, event.channel);
    }
  });

  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    botId = rtmStartData.self.id;
    opt.logger.info(`Logged in as ${rtmStartData.self.name} (id: ${botId}) of team ${rtmStartData.team.name}`);
  });

  return {
    rtm,
    start() { rtm.start(); },
  };
};

export default norrisbot;
