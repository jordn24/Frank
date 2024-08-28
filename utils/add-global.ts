import { REST, Routes } from 'discord.js';
import 'dotenv/config'

const clientId = process.env.DISCORDCLIENTID!;
const token = process.env.DISCORDKEY!;

const rest = new REST({ version: '10' }).setToken(token);

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
