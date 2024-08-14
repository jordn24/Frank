import { REST, Routes } from 'discord.js';
import 'dotenv/config'

const clientId = process.env.DISCORDCLIENTID!;
const token = process.env.DISCORDKEY!;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('Started fetching application (/) commands.');

    const commands = await rest.get(Routes.applicationCommands(clientId));
    const guildCommands = await rest.get(Routes.applicationGuildCommands(clientId, process.env.GUILDID!));


    console.log('Successfully fetched application (/) commands:', commands);
    console.log('Successfully fetched guild (/) commands:', guildCommands);
  } catch (error) {
    console.error(error);
  }
})();
