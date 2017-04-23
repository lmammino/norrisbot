/* eslint no-restricted-syntax: "off" */

export const isMessage = event => Boolean(event.type === 'message' && event.text);

export const isMessageToChannel = message => typeof message.channel === 'string' && message.channel[0] === 'C';

export const isFromUser = (event, userId) => event.user === userId;

export const messageContainsText = (message, possibleTexts) => {
  const messageText = message.text.toLowerCase();
  const texts = Array.isArray(possibleTexts) ? possibleTexts : [possibleTexts];
  for (const text of texts) {
    if (messageText.indexOf(text.toLowerCase()) > -1) {
      return true;
    }
  }

  return false;
};

export const filterJokesByCategories = (jokes, categories) => jokes.filter((joke) => {
  if (joke.categories.length === 0) {
    return true;
  }

  for (const category of categories) {
    if (joke.categories.includes(category)) {
      return true;
    }
  }

  return false;
});

export const pickRandom = arr => arr[Math.floor(Math.random() * arr.length)];
