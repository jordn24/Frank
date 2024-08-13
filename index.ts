import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

import 'dotenv/config'

client.on('ready', () => {
  console.log('Logged in');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'scoreboard') {
    await interaction.reply('Scoreboard:');
  }

});

client.login(process.env.DISCORDKEY);