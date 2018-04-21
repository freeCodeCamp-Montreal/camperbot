// Side effect imports
import './libs/dotenv';
import './libs/postgres';
import { db, sql } from './libs/postgres';

import Discord from 'discord.js';

// Create an instance of Discord client
const client = new Discord.Client();

// Bot will only start reacting to information once ready is emitted
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for messages
client.on('message', msg => {
  if (msg.content === 'ping') {
    // db.any('SELECT * FROM accounts')
    // .then(data => {
    // 	console.log(data);
    // }).catch(err => console.log(err));

    msg.reply('pong');
  }
});

client.login(process.env.BOT_TOKEN);
