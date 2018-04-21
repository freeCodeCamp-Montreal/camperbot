// Side effect imports
import './libs/dotenv';
import './libs/postgres';

import { db, sql } from './libs/postgres';
import {
  insertAccount,
  incrementMarshmellow,
  getMarshmellows,
} from './queries';

import Discord from 'discord.js';

// Create an instance of Discord client
const client = new Discord.Client();

// Bot will only start reacting to information once ready is emitted
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on('message', msg => {
  // Small check to see if bot is online
  if (msg.content.startsWith('ping')) {
    msg.channel.send('pong!');
  }

  // Manually triggers insert into database for a user
  // Mostly for testing or for users before this bot was made
  else if (msg.content === '!knowme' && !msg.author.bot) {
    const callback = data => msg.reply('I have you in my sights now :eyes: ');

    const errorHandler = err => {
      console.log(err);

      // Duplicate user (we could instead do nothing on conflict)
      // but this is more fun :D
      if (err.code === '23505') {
        msg.reply('I already know you!');
      }
    };

    insertAccount({
      discordId: msg.author.id,
      callback,
      errorHandler,
    });
  }

  // Inserts users that don't exist in our db from the discord
  // Must be a Firestarter
  else if (
    msg.content.startsWith('!repopulate') &&
    msg.member.roles.has('363153451833753600')
  ) {
    msg.guild.members.array().forEach(member => {
      insertAccount({
        discordId: member.id,
        createdAt: member.joinedAt,
        callback: () => {
          console.log(`INSERT ${member.displayName} : SUCCESS`);
        },
        errorHandler: err => {
          console.log(`INSERT ${member.displayName} : FAILED`);
        },
      });
    });
    msg.reply('Repopulated accounts table.');
  }

  // Give user(s) marshmellows
  else if (
    msg.content.startsWith('!marshmellow') ||
    msg.content.startsWith('!mm')
  ) {
    const usersIds = msg.mentions.users.keyArray();

    const callback = data => {};

    if (usersIds.length > 0) {
      incrementMarshmellow({
        discordIds: usersIds,
        callback: () => {},
        errorHandler: err => {
          console.log('!mm', err);
        },
      });
    } else {
      msg.reply(
        "you didn't say which user(s) you wanted to give a marshmellow to!"
      );
    }
  }

  // emoji id gotten with /:mmlove:
  else if (msg.content.startsWith('!mine')) {
    getMarshmellows({
      discordId: msg.author.id,
      callback: data => {
        msg.reply(`you have **${data.count}** <:mmlove:437313395427901451>`);
      },
    });
  }
});

// When new people join, add them to our database
client.on('guildMemberAdd', member => {
  insertAccount({
    discordId: member.id,
    errorHandler: err => console.log(err),
  });
});

client.login(process.env.BOT_TOKEN);
