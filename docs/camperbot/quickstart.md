# Quick Start

### Installation

#### Prerequisites

To run this you need to have

* Node 8
* yarn or npm
* cloned this repo
* ❤️

#### Make a discord app

1.  Create a new [discord app](https://discordapp.com/developers/applications/me/) if you don't have one.
2.  Make it a bot user.
3.  Take note of the `Client ID`, `Client Secret` and `Token` \(in the `Bot` section\) Create a `.env` file in your cloned repo. Put the contents of `.env.example` in it and replace with your saved tokens \(first three\)

    ```text
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

#### Local DB

Set up your local database and fill the rest of your `.env` with its credentials.

Then run:

```text
yarn migrate-up
```

You should see something along the lines of this:

```text
$ yarn build &&NODE_PATH=build node -r  libs/dotenv node_modules/.bin/db-migrate up
$ babel src -d build
src/app.js -> build/app.js
...
received data: CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE accounts(
...
```

There should be no error message, and once you check your database you'll see it has tables in it now 🎉.

### Usage

Install dependencies

```text
yarn
```

Run

```text
yarn start
```

or, to reload of src file changes:

```text
yarn start:watch
```
