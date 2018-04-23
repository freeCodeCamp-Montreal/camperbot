import {
  insertAccount,
  incrementMarshmellow,
  getMarshmellows,
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

// Give user(s) marshmellows
export const marshmellow = msg => {
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
};

// emoji id gotten with /:mmlove:
const mine = msg => {
  getMarshmellows({
    discordId: msg.author.id,
    callback: data => {
      msg.reply(`you have **${data.count}** <:mmlove:437313395427901451>`);
    },
  });
};
