# norrisbot

[![Build Status](https://travis-ci.org/lmammino/norrisbot.svg?branch=v1.0.0)](https://travis-ci.org/lmammino/norrisbot)

[![npm version](https://badge.fury.io/js/norrisbot.svg)](http://badge.fury.io/js/norrisbot)

The NorrisBot is a Slack bot that kicks asses, roundhouse-kicks to be precise... It's super-powered with Chuck Norris jockes and it aims to make your Slack channel even more "slacker" and enjoyable.

![Chuck Norris face](icon.jpg)


## Installation

As simple as installing any other global node package. Be sure to have npm and node (`>= 0.10` version, or io.js `>= 1.0`) installed and launch:

```bash
$ npm install -g norrisbot
```


## Getting the API key for your Slack channel

To allow the NorrisBot to connect your Slack channel you must provide him an API key. To retrieve it you need to add a new Bot in your Slack organization by visiting the following url: https://*yourorganization*.slack.com/services/new/bot, where *yourorganization* must be substituted with the name of your organization (e.g. https://*loige*.slack.com/services/new/bot). Ensure you are logged to your Slack organization in your browser and you have the admin rights to add a new bot.

You will find your API key under the field API Token, copy it in a safe place and get ready to use it.


## Configuration

The NorrisBot is configurable through environment variables. There are several variable available:

| Environment variable | Description |
|----------------------|-------------|
| `BOT_API_KEY` | this variable is mandatory and must be used to specify the API token needed by the bot to connect to your Slack organization |
| `BOT_DB_PATH` | optional variable that allows you to use a different database or to move the default one to a different path |
| `BOT_NAME` | the name of your bot, it’s optional and it will default to norrisbot |


## Launching the bot

As you might expect you just have to set your `BOT_API_KEY` environment variable and run:

```bash
$ npm start
```

For example on a unix system you can just do:

```bash
$ BOT_API_KEY=somesecretkey npm start
```


## Bugs and improvements

If you find a bug or have an idea about how to improve the NorrisBot you can [open an issue](https://github.com/lmammino/norrisbot/issues) or [submit a pull request](https://github.com/lmammino/norrisbot/pulls), it will definitely make you a better person! :P


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
