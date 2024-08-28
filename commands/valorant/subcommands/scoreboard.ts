import { Client, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle, CommandInteraction } from 'discord.js';
import DbHandler from "../../../handlers/DbHandler";

interface Field {
    name: string, 
    value: string, 
    raw_value: number, 
    rawPercentage: number 
}

function sortFields(fields: Field[], sort: "number" | "percentage") {
    let sortedFields: Field[] = [];
    let index = 1;

    if(sort == "number"){
        sortedFields = fields.sort((fieldA, fieldB) => (fieldA.raw_value < fieldB.raw_value) ? 1 : -1);
    } else if (sort == "percentage"){
        index = 1;
        sortedFields = fields.sort((fieldA, fieldB) => (fieldA.rawPercentage < fieldB.rawPercentage) ? 1 : -1);
    }

    // Add placement number in front
    for(var i = 0; i < sortedFields.length; i++){
        sortedFields[i].name = sortedFields[i].name.replace(/\d+\.\s/, '')
        sortedFields[i].name = index + ". " + sortedFields[i].name
        index = index + 1
    }

    return sortedFields;
}

export default async function scoreboard(client: Client, interaction: CommandInteraction, filter: string = "this_act") {
    const dbHandler = new DbHandler();
    await dbHandler.connect();

    const embed = new EmbedBuilder()

    // Create buttons
    const option1Button = new ButtonBuilder()
        .setCustomId('current')
        .setLabel('This Act')
        .setStyle(ButtonStyle.Primary);

    const option2Button = new ButtonBuilder()
        .setCustomId('alltime')
        .setLabel('All Time')
        .setStyle(ButtonStyle.Danger);

    const option3Button = new ButtonBuilder()
        .setCustomId('percentage')
        .setLabel('Percentage')
        .setStyle(ButtonStyle.Secondary);

    // Create button row
    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(option1Button, option2Button, option3Button);

    let users = await dbHandler.getUsers();

    const actFields: Field[] = [];
    const allTimeFields: Field[] = [];

    users.forEach((user) => {
        actFields.push({
            name: user.user + ":",
            value: `Bottom fragged ${user.bottomFrags} time/s with a rate of ${parseFloat(user.percentage).toFixed(2)}%`,
            raw_value: parseInt(user.bottomFrags),
            rawPercentage: parseFloat(user.percentage),
        });

        allTimeFields.push({
            name: user.user + ":",
            value: `Bottom fragged ${user.allTimeBottomFrags} time/s with a rate of ${parseFloat(user.allTimePercentage).toFixed(2)}%`,
            raw_value: parseInt(user.allTimeBottomFrags),
            rawPercentage: parseFloat(user.allTimePercentage),
        });
    });

    switch (filter) {
        case 'this_act':
            embed.setTitle("Act Leaderboard");
            embed.setFields(sortFields(actFields, "number"));
            embed.setColor('Blue');
            break;
        case 'all_time':
            embed.setTitle("All Time Leaderboard");
            embed.setFields(sortFields(allTimeFields, "number"));
            embed.setColor('Red');
            break;
        default:
            embed.setTitle("Act Leaderboard");
            embed.setFields(sortFields(actFields, "number"));
            embed.setColor('Blue');
            break;
    }

    const sentMessage = await interaction.reply({ embeds: [embed], components: [buttonRow], fetchReply: true });

    // Create an interaction collector to listen for button clicks
    const collector = sentMessage.createMessageComponentCollector();

    // Event handler for button interactions
    collector.on('collect', async (btnInteraction) => {
        if (btnInteraction.isButton()) {
            const clickedOption = btnInteraction.customId;

            switch (clickedOption) {
                case 'current':
                    embed.setTitle("Act Leaderboard");
                    embed.setFields(sortFields(actFields, "number"));
                    embed.setColor('Blue');
                    break;
                case 'alltime':
                    embed.setTitle("All Time Leaderboard");
                    embed.setFields(sortFields(allTimeFields, "number"));
                    embed.setColor('Red');
                    break;
                case 'percentage':
                    if (embed.data.title === "Act Leaderboard") {
                        embed.setTitle("Act Leaderboard (Sorted by Percentage)");
                        embed.setFields(sortFields(actFields, "percentage"));
                        embed.setColor('Grey');
                    } else if (embed.data.title === "All Time Leaderboard") {
                        embed.setTitle("All Time Leaderboard (Sorted by Percentage)");
                        embed.setFields(sortFields(allTimeFields, "percentage"));
                        embed.setColor('Grey');
                    }
                    break;
            }

            // Update the embed message
            await btnInteraction.update({ embeds: [embed] });
        }
    });
}