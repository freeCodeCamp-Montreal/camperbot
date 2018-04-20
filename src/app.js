import * as dotenv from 'dotenv';
import Discord from 'discord.js';

// Allows us to use process.env
dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(process.env.BOT_TOKEN);
