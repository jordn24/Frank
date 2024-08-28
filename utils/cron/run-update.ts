import 'dotenv/config';

import { Client, TextChannel } from 'discord.js';
import { exit } from 'process';
import update from '../../commands/valorant/subcommands/update';
// const APIHandler = require('../Core/APIHandler');

const client: Client = new Client({ intents: ['Guilds', 'GuildMessages'] });

if(!client) {
    console.log("Client was not set up correctly.");
    exit(0)
}

const token = process.env.DISCORDKEY;

client.once('ready', async () => {
    await update(client);
    process.exit(0);
});
client.login(token);