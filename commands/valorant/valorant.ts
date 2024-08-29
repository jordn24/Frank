import { SlashCommandBuilder } from 'discord.js';
import { Client } from 'discord.js';
import scoreboard from './subcommands/scoreboard';
import update from './subcommands/update';

const cooldowns = new Map();

export const data = new SlashCommandBuilder()
    .setName('valorant')
    .setDescription('Valorant commands.')
    .addSubcommand(subcommand =>
        subcommand
        .setName('scoreboard')
        .setDescription('Shows bottom frag scoreboard.')
        .addStringOption(option => 
            option.setName('filter')
            .setRequired(false)
            .addChoices(
                { name: 'This Act', value: 'this_act' },
                { name: 'All Time', value: 'all_time' }
            )))
    .addSubcommand(subcommand =>
        subcommand
        .setName('update')
        .setDescription('Runs a manual check for bottom frags.'));

export const execute = async (client: Client, interaction: any) => {
    if (!interaction.isCommand()) return;

    const subcommand = interaction.options.getSubcommand();


    if(subcommand === "scoreboard"){
        await scoreboard(client, interaction, interaction.options.getString('filter'));
    }

    if(subcommand === "update"){
        const commandName = "update";
        const cooldownAmount = 300 * 1000; // Cooldown time in milliseconds (e.g., 5 seconds)
    
        if (cooldowns.has(commandName)) {
            const expirationTime = cooldowns.get(commandName) + cooldownAmount;
    
            if (Date.now() < expirationTime) {
                const timeLeft = (expirationTime - Date.now()) / 1000;
                return interaction.reply({
                    content: `Please wait ${timeLeft.toFixed(1)} more seconds before using the \`${commandName}\` command again.`,
                    ephemeral: true
                });
            }
        }
    
        // Set the cooldown
        cooldowns.set(commandName, Date.now());
        
        interaction.reply(
            { 
                // content: "Running update, wait a minute.",
                content: "Wait idiot",
                ephemeral: true
            });    
        // Execute the command logic
        // update(client);


        // Remove the command from the cooldown map after the cooldown period
        setTimeout(() => cooldowns.delete(commandName), cooldownAmount);
    }

};
