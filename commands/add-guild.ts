import { REST, Routes } from 'discord.js';
import 'dotenv/config';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'valorant',
    description: 'Valorant Commands',
    options: [
        {
            type: 1,
            name: 'scoreboard',
            description: 'Shows bottom frag scoreboard.'
        },
        {
            type: 1,
            name: 'update',
            description: 'Runs a manual check for bottom frags.'
        }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDKEY!);

(async () => {
  try {
    console.log('Started refreshing guild (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.DISCORDCLIENTID!, process.env.GUILDID!),
      { body: commands },
    );

    console.log('Successfully reloaded guild (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
