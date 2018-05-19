/**
 * Contains the logic of commands which the users will
 * send out
 */
import {
  insertAccount,
  incrementMarshmallow,
  getMarshmallows,
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
    incrementMarshmallow({
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

// Return the user's total marshmallows
export const mine = msg => {
  getMarshmallows({
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

// Sends a DM with the help embed dialog
export const help = msg => {
  const description =
    'You can find a list of commands here:' +
    '\nhttps://sirmerr.github.io/camperbot/#/camperbot/commands' +
    '\n\nFor a specific command help, use `[!h|!help] CommandName` (for example `!h !marshmallow`)';

  // Send a private embed message with a blue left border
  msg.author.send({
    embed: {
      color: 0x0000ff,
      description,
    },
  });
};

// Send details of a given command
export const helpSpecific = msg => {
  const { content, channel } = msg;
  const userRoles = msg.member.roles;
  const command = content.split(' ')[1];
  let commandInfo;

  // True if command exists, otherwise returns false
  const commandExists =
    commandsList.find(el => {
      if (Array.isArray(el.names)) {
        if (el.names.find(name => command === name) !== undefined) {
          commandInfo = {
            title: '`' + el.names.join('` | `') + '`',
            description: el.description,
            role: el.role,
          };
          return true;
        }
        return false;
      }
      if (el.names === command) {
        commandInfo = {
          title: '`' + command + '`',
          description: el.description,
          role: el.role,
        };
        return true;
      }
      return false;
    }) !== undefined;

  if (commandExists) {
    channel.send({
      embed: {
        color: 0x0000ff,
        title: commandInfo.title,
        description: commandInfo.description,
      },
    });
  } else {
    channel.send({
      embed: {
        color: 0xff0000,
        description:
          "I can't find that command. Please check if the command exists [here](https://sirmerr.github.io/camperbot/#/camperbot/commands)",
      },
    });
  }
};

// ex:
// !emoji <name> <url>
export const emoji = async msg => {
  const { content, channel, guild } = msg;
  const regex = /!emoji\s(.*)\s(.*)/;

  try {
    const { 1: name, 2: url } = regex.exec(content);
    const newEmoji = await guild.createEmoji(url, name);
    channel.send(`\`${newEmoji.name}\` ${newEmoji} has been added!`);
  } catch (e) {
    channel.send({
      embed: {
        color: 0xff0000,
        description: `\`${name}\` could not be added! THAT'S SO SAD!`,
      },
    });
  }
};
