/**
 * Main entry point of our app. Sets up the client and
 * lays out the different commands users
 */
import Discord from 'discord.js';

// Side effect imports
import './libs/dotenv';
import './libs/postgres';
// Module imports
import { knowme, repopulate, marshmallow, mine } from './commands';
import { insertAccount } from './queries';

// Create an instance of Discord client
const client = new Discord.Client();
// Prefix that every command should start with
const prefix = '!';

// Bot will only start reacting to information once ready is emitted
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on('message', msg => {
  const { content, author } = msg;

  // Returns true if the message content matches any of
  // the given commands
  const commandMatches = commands => {
    if (Array.isArray(commands)) {
      for (let i = 0; i < commands.length; i++) {
        if (
          `${prefix}${commands[i]}` === content.substr(0, content.indexOf(' '))
        )
          return true;
      }
      return false;
    }

    return `${prefix}${commands}` === content;
  };

  // Do not evaluate a message not starting with  our prefix
  if (content.startsWith(prefix)) {
    switch (true) {
      case commandMatches('ping'):
        msg.channel.send('pong!');
        break;
      case commandMatches('knowme') && !msg.author.bot:
        knowme(msg);
        break;
      case commandMatches('repopulate') &&
        msg.member.roles.has('363153451833753600'):
        repopulate(msg);
        break;
      case commandMatches(['marshmallow', 'mm']):
        marshmallow(msg);
        break;
      case commandMatches('mine'):
        mine(msg);
        break;
      default:
        break;
    }
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
