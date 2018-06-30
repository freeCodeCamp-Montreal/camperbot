/**
 * Main entry point of our app. Sets up the client and
 * lays out the different commands users
 */
import Discord from "discord.js";

// Side effect imports
import "./libs/dotenv";
import "./libs/postgres";
// Module imports
import {
  knowme,
  repopulate,
  marshmallow,
  mine,
  help,
  helpSpecific,
  emoji,
} from "./commands";
import { insertAccount } from "./queries";

// Create an instance of Discord client
const client = new Discord.Client();
// Prefix that every command should start with
const prefix = "!";

// Bot will only start reacting to information once ready is emitted
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on("message", async msg => {
  // Ignore messages from the bot
  if (msg.author.bot) return;

  //Ignore any message that does not start with prefix
  if (msg.content.indexOf(prefix) !== 0) return;

  //   console.log(`content: ${msg.content}
  // author: ${msg.author}
  // channel: ${msg.channel}
  // member: ${msg.member}
  // `);

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "ping":
      msg.channel.send("pong!");
      break;
    case "knowme":
      knowme(msg);
      break;
    case "repopulate":
      if (msg.member.roles.has("363153451833753600")) repopulate(msg);
      break;
    case "marshmallow":
    case "mm":
      marshmallow(msg);
      break;
    case "mine":
      mine(msg);
      break;
    case "help":
    case "h":
      if (args.length === 0) help(msg);
      else if (args[0].match(new RegExp(`^${prefix}?\\w+`, "g")))
        helpSpecific(msg, args[0].slice(prefix.length).trim());
      else helpSpecific(msg, "");
      break;
    case "emoji":
      emoji(msg);
      break;
    default:
      break;
  }
});

// When new people join, add them to our database
client.on("guildMemberAdd", member => {
  insertAccount({
    discordId: member.id,
    errorHandler: err => console.log(err),
  });
});

client.login(process.env.BOT_TOKEN);
