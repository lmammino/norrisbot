import {
  isMessage,
  isMessageToChannel,
  isFromUser,
  messageContainsText,
} from '../utils';

test('It should check if a given event is a message', () => {
  const notAMessage = {
    type: 'NotAMessage',
  };

  const messageWithoutText = {
    type: 'message',
    text: '',
  };

  const properMessage = {
    type: 'message',
    text: 'hello Chuck',
  };

  expect(isMessage(notAMessage)).toBe(false);
  expect(isMessage(messageWithoutText)).toBe(false);
  expect(isMessage(properMessage)).toBe(true);
});

test('It should check if a message is sent to a channel', () => {
  const notToAChannel = {
    type: 'message',
    subtype: 'file_share',
    ts: '1358877455.000010',
    text: '<@cal> uploaded a file: <https:...7.png|7.png>',
    file: '{...}',
    user: 'U2147483697',
    upload: true,
  };

  const exampleSubType = {
    type: 'message',
    subtype: 'channel_join',
    text: '<@U023BECGF|bobby> has joined the channel',
    ts: '1403051575.000407',
    user: 'U023BECGF',
  };

  const toAChannel = {
    type: 'message',
    channel: 'C2147483705',
    user: 'U2147483697',
    text: 'Hello, world!',
    ts: '1355517523.000005',
    edited: {
      user: 'U2147483697',
      ts: '1355517536.000001',
    },
  };

  expect(isMessageToChannel(notToAChannel)).toBe(false);
  expect(isMessageToChannel(exampleSubType)).toBe(false);
  expect(isMessageToChannel(toAChannel)).toBe(true);
});

test('It should check if an event is from a given user', () => {
  const event = {
    type: 'message',
    subtype: 'channel_join',
    text: '<@U023BECGF|bobby> has joined the channel',
    ts: '1403051575.000407',
    user: 'U023BECGF',
  };

  expect(isFromUser(event, 'Some other user')).toBe(false);
  expect(isFromUser(event, 'U023BECGF')).toBe(true);
});

test('It should check if a message contains some text', () => {
  const message = {
    type: 'message',
    channel: 'C2147483705',
    user: 'U2147483697',
    text: 'Hello, Chuck Norris!',
    ts: '1355517523.000005',
    edited: {
      user: 'U2147483697',
      ts: '1355517536.000001',
    },
  };

  expect(messageContainsText(message, 'bruce')).toBe(false);
  expect(messageContainsText(message, ['bruce'])).toBe(false);
  expect(messageContainsText(message, 'hello')).toBe(true);
  expect(messageContainsText(message, ['hello'])).toBe(true);
  expect(messageContainsText(message, ['hello'])).toBe(true);
  expect(messageContainsText(message, ['bruce', 'chuck'])).toBe(true);
});
