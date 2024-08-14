import { Client, CommandInteraction, GatewayIntentBits } from 'discord.js';
import { statuses } from "./status";
import path from 'path';
import 'dotenv/config'
import getAllFiles from './utils/get-all-files';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

let localCommands = [];

  // Get top level command folders
  const commandCategories = getAllFiles(
    path.join(__dirname, 'commands'),
    true
  );

  // Get all command file names and import them
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);

      localCommands.push(commandObject);
    }
  }

client.on('ready', () => {
  console.log('Logged in');

  client.user!.setActivity(statuses[Math.floor(Math.random() * statuses.length)]);

  // Change status every 6 hours
  setInterval(() => {
    client.user!.setActivity(statuses[Math.floor(Math.random() * statuses.length)]);
  }, 21600000)
});

client.on('interactionCreate', async ( interaction )  => {
  if (!interaction.isChatInputCommand()) return;

  // Figure out which command to run
  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.data.name === interaction.commandName
    );

    if (!commandObject) return;

    await commandObject.execute(client, interaction as CommandInteraction);
    
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
});

client.login(process.env.DISCORDKEY);