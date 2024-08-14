import { REST, Routes } from 'discord.js';
import 'dotenv/config'

const clientId = process.env.DISCORDCLIENTID!;
const token = process.env.DISCORDKEY!;
const guildId = process.env.GUILDID!;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started fetching application (/) commands.');

    // Fetch all global slash commands
    const commands = await rest.get(Routes.applicationCommands(clientId)) as Array<{ id: string }>;

    console.log('Successfully fetched application (/) commands:', commands);

    // Delete all global slash commands
    for (const command of commands) {
      await rest.delete(Routes.applicationCommand(clientId, command.id));
      console.log(`Successfully deleted command with ID ${command.id}`);
    }

    // Fetch all global slash commands
    const guildCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId)) as Array<{ id: string }>;

    console.log('Successfully fetched guild (/) commands:', commands);

    // Delete all global slash commands
    for (const command of guildCommands) {
      await rest.delete(Routes.applicationGuildCommand(clientId, command.id, guildId));
      console.log(`Successfully deleted command with ID ${command.id}`);
    }
    

    console.log('All commands have been deleted.');
  } catch (error) {
    console.error('Error deleting commands:', error);
  }
})();
