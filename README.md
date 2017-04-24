# norrisbot

[![Build Status](https://travis-ci.org/lmammino/norrisbot.svg?branch=v1.0.0)](https://travis-ci.org/lmammino/norrisbot) [![npm version](https://badge.fury.io/js/norrisbot.svg)](http://badge.fury.io/js/norrisbot) [![Known Vulnerabilities](https://snyk.io/test/github/lmammino/norrisbot/badge.svg)](https://snyk.io/test/github/lmammino/norrisbot)

## Make your team hyper-productive with cutting Chuck Norris jokes

The NorrisBot is a Slack bot that kicks asses, roundhouse-kicks to be precise... It's super-powered with Chuck Norris jokes and it aims to make your Slack channel even more "slacker" and enjoyable.

![Chuck Norris face](assets/norrisbot-logo-small.png)

NorrisBot is loaded with guns and jokes about Chuck Norris and it will tell a random joke every time that someone says “Chuck Norris” or "norrisbot" in a slack channel.

![Norrisbot in action](assets/screenshot.png)


## Installation

As simple as installing any other global node package. Be sure to have npm and node (`>= 4.3.2` version) installed and launch:

```bash
$ npm install -g norrisbot
```


## Running the NorrisBot

To run the NorrisBot you must have a valid Slack [BOT token](#getting-the-bot-token-for-your-slack-channel) to authenticate the bot on your slack organization. Once you get it (instructions on the next paragraph) you just have to run:


```bash
NORRISBOT_TOKEN=somesecretkey norrisbot
```


## Getting the BOT token for your Slack channel

To allow the NorrisBot to connect your Slack channel you must provide him a BOT token. To retrieve it you need to add a new Bot in your Slack organization by visiting the following url: https://*yourorganization*.slack.com/services/new/bot, where *yourorganization* must be substituted with the name of your organization (e.g. https://**loige**.slack.com/services/new/bot). Ensure you are logged to your Slack organization in your browser and you have the admin rights to add a new bot.

You will find your BOT token under the field `API Token`, copy it in a safe place and get ready to use it.

As an alternative you can create a bot by creating a custom application in the [Slack developer portal](https://api.slack.com/apps). Inside the application settings you will be able to add a bot user and retrieve a OAUTH BOT token for it.


## Configuration

The NorrisBot is configurable through environment variables. There are several variable available:


| Environment variable | Description |
|----------------------|-------------|
| `NORRISBOT_TOKEN` | The Slack Bot User OAuth Access Token for your organisation/team *(mandatory)* |
| `NORRISBOT_TRIGGERS` |  A coma separated list of words that triggers the bot to reply with a joke *(default: `"Chuck Norris,norrisbot"`)* |
| `NORRISBOT_CATEGORIES` | A coma separated list to enable special joke categories like "explicit" and "nerdy" *(default: `"nerdy"`)* |
| `NORRISBOT_NO_PICTURES` | If set to TRUE will disable pictures in jokes *(default: `FALSE`)* |
| `NORRISBOT_MESSAGE_COLOR` | The hex color used by the bot to mark it's messages *(default: `"#590088"`)* |


## Building the bot from source

If you downloaded the source code of the bot you can build the bot with

```bash
npm run build
```

Then you can run it with:

```bash
$ npm start
```

Don't forget to set your `NORRISBOT_TOKEN` environment variable bedore doing so and to install all the dependencies (including dev ones with NPM or Yarn).


## Bugs and improvements

If you find a bug or have an idea about how to improve the NorrisBot you can [open an issue](https://github.com/lmammino/norrisbot/issues) or [submit a pull request](https://github.com/lmammino/norrisbot/pulls), it will definitely make you a better person! :P


## The Making of

Version 1 of NorrisBot has been developed in collaboration with [Scotch.io](https://scotch.io). A [very detailed article](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers) has been published to explain every single line of code. It also explains you how to deploy the bot on a free Heroku instance, so you should give it a shot!

Enjoy your reading!


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
