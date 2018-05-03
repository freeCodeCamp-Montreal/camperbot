/**
 * Contains the logic of commands which the users will
 * send out
 */
import {
  insertAccount,
  incrementmarshmallow,
  getmarshmallows,
} from './queries';
import commandsList from './help.json';

// Manually triggers insert into database for a user
// Mostly for testing or for users before this bot was made
export const knowme = msg => {
  const callback = data => msg.reply('I have you in my sights now :eyes: ');
  const errorHandler = err => {
    console.log('!knowme : ', err);
    // Duplicate user (we could instead do nothing on conflict)
    // but this is more fun :D
    if (err.code === '23505') {
      msg.reply('I already know you!');
    }
  };

  insertAccount({
    discordId: msg.author.id,
    createdAt: msg.member.joinedAt,
    callback,
    errorHandler,
  });
};

// Inserts users that don't exist in our db from the discord
// Must be a Firestarter
export const repopulate = msg => {
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
};

// Give user(s) marshmallows
export const marshmallow = msg => {
  // Gets the first user mentioned in the message
  const user = msg.mentions.users.first();

  if (user.id === msg.author.id) {
    msg.reply("lol you can't give yourself marshmallows");
  } else {
    incrementmarshmallow({
      discordId: user.id,
      callback: data => {
        console.log('!mm success');
        msg.channel.send(
          `${user} you have ${
            data.marshmallows
          } marshmallows! <:mmlove:437313395427901451>`
        );
      },
      errorHandler: err => {
        console.log('!mm', err);
        msg.reply('Unable to give marshmallows :(');
      },
    });
  }
};

// emoji id gotten with /:mmlove:
export const mine = msg => {
  getmarshmallows({
    discordId: msg.author.id,
    callback: data => {
      msg.reply(
        `you have **${data.marshmallows}** <:mmlove:437313395427901451>`
      );
    },
  });
};

// Sends a DM with all the commands
export const help = msg => {
  const description =
    'You can find a list of commands here:' +
    '\nhttps://sirmerr.github.io/camperbot/#/camperbot/commands' +
    '\n\nFor a specific command help, use `[!h|!help] CommandName` (for example `!h !marshmallow`)';

  msg.author.send({
    embed: {
      color: 3447003,
      description,
    },
  });
};

export const helpSpecific = msg => {
  const { content, author } = msg;
  const userRoles = msg.member.roles;
  let helpDialog = '';

  commandsList.forEach(command => {
    if (userRoles.exists('name', command.role)) {
      helpDialog += '';
    }
  });
};
