import { REST, Routes } from 'discord.js';
import 'dotenv/config'

const clientId = process.env.DISCORDCLIENTID!;
const token = process.env.DISCORDKEY!;

const commandId = 'COMMAND_ID';

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started deleting application (/) command.');

    await rest.delete(Routes.applicationCommand(clientId, commandId));

    console.log('Successfully deleted application (/) command.');
  } catch (error) {
    console.error(error);
  }
})();
