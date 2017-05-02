# norrisbot

[![CircleCI](https://circleci.com/gh/lmammino/norrisbot.svg?style=shield)](https://circleci.com/gh/lmammino/norrisbot) [![npm version](https://badge.fury.io/js/norrisbot.svg)](http://badge.fury.io/js/norrisbot) [![codecov](https://codecov.io/gh/lmammino/norrisbot/branch/master/graph/badge.svg)](https://codecov.io/gh/lmammino/norrisbot)
[![Known Vulnerabilities](https://snyk.io/test/github/lmammino/norrisbot/badge.svg)](https://snyk.io/test/github/lmammino/norrisbot)

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


### Alternative Installation (binaries)

From release 2.0.3, every release comes also with dependency-free binaries for linux, mac and windows that can be downloaded in the [Releases page on GitHub](https://github.com/lmammino/norrisbot/releases).


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


## Installing on Heroku

A great place where to deploy our lovely NorrisBot is [Heroku](https://heroku.com). We can go reasonably well with their free worker tier and the deploy process is reasonably easy and convenient. Let’s see how we can do that.

I am assuming you already have and account on Heroku and that you have installed and configured the [Heroku toolbelt](https://devcenter.heroku.com/articles/heroku-cli) on your machine.

### 1. Create a new Heroku app

Create a local folder and install norrisbot on it:

```bash
mkdir norrisbot-myorg
cd norrisbot-myorg
npm init -y
npm i --save norrisbot
```

Then create a new app on heroku:

```bash
heroku create norrisbot-myorg
```

### 2. Configure your Heroku app:

```bash
heroku config:set --app norrisbot-myorg NORRISBOT_TOKEN=xoxb-YOUR-AWESOME-BOT-TOKEN
```

(of course you need to replace `xoxb-YOUR-AWESOME-BOT-TOKEN` with your actual token).

You can add extra configuration by defining values for the [other supported environment variables](#configuration) if you want to customize the behavior of the bot.

### 3. Initialize your Heroku app

Create an Heroku `Procfile` (service definition)

```bash
echo "worker: node_modules/.bin/norrisbot" >> Procfile
```

Then prepare the project to be published through git:

```bash
git init
echo "node_modules/" >> .gitignore
git add --all
git commit -am "first version"
heroku git:remote --app norrisbot-myorg
```

### 4. Publish and launch the Heroku app

Through heroku git

```bash
git push heroku master
```

Stop the web app (not present but started by default by Heroku) and run the worker:

```bash
heroku ps:scale web=0 worker=1
```

That's it, now go on your Slack organization and start enjoying Chuck Norris jokes! 😂


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

[![Building a Slack Bot with Node.js and Chuck Norris Super Powers](https://scotch.io/wp-content/uploads/2015/09/build-a-slack-bot-with-node-and-chuck-norris-super-powers.png)](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers)

Enjoy your reading!


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.