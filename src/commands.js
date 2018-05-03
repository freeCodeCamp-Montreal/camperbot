/**
 * Contains the logic of commands which the users will
 * send out
 */
import {
  insertAccount,
  incrementmarshmallow,
  getmarshmallows,
} from './queries';

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
        const marshmallowEmojis = msg.guild.emojis
          .filter(emoji => emoji.name.match('mm'))
          .array();
        const randomMarshmallowEmoji =
          marshmallowEmojis[
            Math.floor(Math.random() * marshmallowEmojis.length)
          ];

        msg.channel.send(
          `${user} you have ${
            data.marshmallows
          } marshmallows! ${randomMarshmallowEmoji}`
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
      const marshmallowEmojis = msg.guild.emojis
        .filter(emoji => emoji.name.match('mm'))
        .array();
      const randomMarshmallowEmoji =
        marshmallowEmojis[Math.floor(Math.random() * marshmallowEmojis.length)];

      msg.reply(`you have **${data.marshmallows}** ${randomMarshmallowEmoji}`);
    },
  });
};
