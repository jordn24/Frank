import { SlashCommandBuilder } from 'discord.js';
import { CommandInteraction, Client } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

export const execute = async (client: Client, interaction: CommandInteraction) => {
  await interaction.reply(`Pong!`);
};
