# camperbot ⛺️🔥🤖

[![Build Status](https://travis-ci.org/sirMerr/camperbot.svg?branch=dev)](https://travis-ci.org/sirMerr/camperbot) [![codecov](https://codecov.io/gh/sirMerr/camperbot/branch/dev/graph/badge.svg)](https://codecov.io/gh/sirMerr/camperbot) ![open source](https://img.shields.io/badge/❤-open--source-e64980.svg?longCache=true) <a href="https://discord.gg/WZB4AuS">![Discord](https://img.shields.io/discord/362050213403164673.svg?logo=discord&colorB=7289DA)</a>

freeCodeCamp Montreal discord bot, using [discord.js](https://github.com/discordjs/discord.js). Gives people marshmellows.

Discord: https://discord.gg/WZB4AuS

## Installation

### Prerequisites

To run this you need to have

* Node 8
* yarn or npm
* cloned this repo
* ❤️

### Make a discord app

1.  Create a new [discord app](https://discordapp.com/developers/applications/me/) if you don't have one.
2.  Make it a bot user.
3.  Take note of the `Client ID`, `Client Secret` and `Token` (in the `Bot` section)
    Create a `.env` file in your cloned repo. Put the contents of `.env.example` in it and replace with your saved tokens (first three)

    ```env
    CLIENT_ID=
    CLIENT_SECRET=
    BOT_TOKEN=

    # Postgres DB
    DB_HOST=
    DB_NAME=
    DB_USER=
    DB_PORT=
    DB_PASSWORD=
    ```

### Local DB

Note: You don't need this if you are not working on commands that rely on a database. Additionally, we use PostgreSQL.

Set up your local database and fill the rest of your `.env` with its credentials.

Then run:

```
yarn migrate-up
```

You should see something along the lines of this:

```bash
$ yarn build &&NODE_PATH=build node -r  libs/dotenv node_modules/.bin/db-migrate up
$ babel src -d build
src/app.js -> build/app.js
...
received data: CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE accounts(
...
```

There should be no error message, and once you check your database you'll see it has tables in it now :tada:.

## Usage

Install dependencies

```
yarn
```

Run

```
yarn start
```

or, to reload of src file changes:

```
yarn start:watch
```

## Commands

**At this time, many commands are intended for development purposes**

For a full, detailed list of commands, go here: https://sirmerr.github.io/camperbot/#/camperbot/commands

* `!ping`: Responds with `pong!`
* `!help` | `!h`: Either shows a help for a single command, or DMs you a help link if no parameters are specified.
* `!knowme`: Checks if you are in the `accounts` table, and adds you if you're not
* `!repopulate`: [**FireStarter**] Add every member of the server/guild who isn't in the `accounts` table
* `!marshmellow [@username]` | `!mm [@username]`: Gives someone a marshmellow for being helpful (you can give marshmellows to multiple people at a time (ex: `!marshmellow @username1 @username2`)
* `!mine`: Shows whoever triggered this command how many marshmellows they have

## Upcoming Features

* `!camping`: Give people a `Camper` role after having been part of the discord for a month (they trigger it)
* People can ask questions via it (via DM or in chat), it will respond with similar questions/answers and also notify mentors if we want it to (+ would add it to our docs website so others can see)
* `!nextevent` -> responds with the next event planned (facebook link or something)
* `!iknow` [comma separated stuff] -> Add a self-summary of what languages/techs you know
* `!theyknow @user` -> Check what languages/techs a user knows
* give points to people that react/respond to questions/peer-review
