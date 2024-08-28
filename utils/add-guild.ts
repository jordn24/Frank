import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import 'dotenv/config';

// Define commands using SlashCommandBuilder
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  new SlashCommandBuilder()
    .setName('valorant')
    .setDescription('Valorant Commands')
    .addSubcommand(subcommand =>
      subcommand
        .setName('scoreboard')
        .setDescription('Shows bottom frag scoreboard.')
        .addStringOption(option =>
          option
            .setName('filter')
            .setDescription('Filter results by a specific criterion')
            .addChoices(
              { name: 'This Act', value: 'this_act' },
              { name: 'All Time', value: 'all_time' }
            )
            .setRequired(false))
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('update')
        .setDescription('Runs a manual check for bottom frags.'))
];

// Convert commands to JSON format
const commandData = commands.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDKEY!);

(async () => {
  try {
    console.log('Started refreshing guild (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORDCLIENTID!, process.env.GUILDID!),
      { body: commandData },
    );

    console.log('Successfully reloaded guild (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
