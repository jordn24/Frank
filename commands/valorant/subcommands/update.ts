import 'dotenv/config';


import DbHandler from "../../../handlers/DbHandler";
import APIHandler from "../../../handlers/APIHandler";
import didBottomFrag from '../../../handlers/ValorantAPI';
import { Client, TextChannel } from 'discord.js';
import { exit } from 'process';

const client: Client = new Client({ intents: ['Guilds', 'GuildMessages'] });
const { messages } = require('../../../assets/ValorantShaming/messages.json');

if(!client) {
    console.log("Client was not set up correctly.");
    exit(0)
}

const token = process.env.DISCORDKEY;
//const channelid = process.env.GENERAL_CHANNEL_ID;
const channelId = "865432456702590978";

export default async function update(client: Client) {
    try{
        // Database Connection
        const dbHandler = new DbHandler();
        await dbHandler.connect();

        let users = await dbHandler.getUsers();

        // For every username
        for (const user of users) {
            console.log("\nStarting for: " + user.user);
            
            let bottomFragged: false | string = await didBottomFrag(user.user, user.tag);
            let formatted_msg;

            if(bottomFragged){

                // If already checked then do nothing
                if (bottomFragged === user.latestMatch){
                    console.log("Latest match already checked.");
                } else {
                    // Send message in general
                    formatted_msg = "<@" + user.discId + "> " + messages[Math.floor(Math.random() * messages.length)]

                    // Send to channel id in config
                    const channel = await client.channels.fetch(channelId) as TextChannel;
                    if(channel) {
                        channel.send(formatted_msg);
                        console.log("Sent Message!");
                    } else {
                        console.log("Couldn't send to channel.");
                    }

                    try {
                        // Call Act Matches APIs
                        const newActMatches = await APIHandler.get(process.env.WEB_TRACKER_API! + process.env.WEB_TRACKER_ACT_URI! + "?user=" +
                            user.user.replace(" ", "%20") + "&tag=" + user.tag, "tracker-api", "tracker-api-password");
                        
                        // Calculate new percentage
                        let newPercentage = 0;
                        let newScore = parseInt(user.bottomFrags) + 1

                        if(newActMatches.data > 0){
                            newPercentage =  newScore / newActMatches.data * 100
                        }
                                
                        console.log("New Act Matches: " + newActMatches.data)
                        console.log("New Percentage: " + newPercentage)
                        console.log("New Score: " + newScore)
                        console.log("Pre run: " + user.bottomFrags)

                        // Update Scores
                        await dbHandler.updateUser(user._id, "bottomFrags", newScore.toString());
                        // Update Matches
                        await dbHandler.updateUser(user._id, "matches", newActMatches.data.toString());
                        // Update Percentage
                        await dbHandler.updateUser(user._id, "percentage", newPercentage.toString());
                        // Update latest match id
                        await dbHandler.updateUser(user._id.toString(), "latestMatch", bottomFragged);

                    } catch (e) {
                        console.log(e);
                    }
                }

            } else {
                console.log("Not bottom.")
            }
        }
    } catch (error) {
        console.log("Error Occured: ", error);
    } finally {
        console.log("\nDone");
    }     
}
