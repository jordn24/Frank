import 'dotenv/config';


import DbHandler from "./handlers/DbHandler";
import didBottomFrag from './handlers/ValorantAPI';
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import { exit } from 'process';
// const APIHandler = require('../Core/APIHandler');

const client: Client = new Client({ intents: ['Guilds', 'GuildMessages'] });
const { messages } = require('./assets/ValorantShaming/messages.json');

if(!client) {
    console.log("Client was not set up correctly.");
    exit(0)
}

const token = process.env.DISCORDKEY;
//const channelid = process.env.GENERAL_CHANNEL_ID;
const channelId = "865432456702590978";

client.once('ready', async () => {

    try {

        // Database Connection
        const dbHandler = new DbHandler();
        await dbHandler.connect();

        let users = await dbHandler.getUsers();

        // For every username
        for (const user of users) {
            console.log("\nStarting for: " + user.user);
            
            let bottomFragged = await didBottomFrag(user.user, user.tag)
            
            let formatted_msg;
            let tracker_link;

            if(bottomFragged){
                // Send message in general
                formatted_msg = "<@" + user.discId + "> " + messages[Math.floor(Math.random() * messages.length)]

            // Send to channel id in config
            const channel = await client.channels.fetch(channelId) as TextChannel;
            if(channel) {
                channel.send(formatted_msg);
            } else {
                console.log("Couldn't send to channel.");
            }

            // // Call Act Matches APIs
            // const newActMatches = await APIHandler.post(process.env.WEB_TRACKERGG_API + process.env.WEB_TRACKERGG_ACT_URI + "?user=" +
            //     user.user + "&tag=" + user.tag);

            // // Calculate new percentage
            // let newPercentage;
            // let newScore = parseInt(user.score) + 1

            //         if(newActMatches.data > 0){
            //             newPercentage =  newScore / newActMatches.data * 100
            //         }
                    
            // console.log("New Act Matches: " + newActMatches.data)
            // console.log("New Percentage: " + newPercentage)
            // console.log("New Act Matches: " +  newActMatches.data)
            // console.log("Pre Run User Score: " + newScore)
            // console.log("Match ID: " + match_id)

                    // if(newPercentage > 0 && newActMatches.data > 0 && newScore > 0 && match_id.length > 0){
                    //     // Update Scores
                    //     await dbHandler.updateUser(user._id, "score", newScore.toString());
                    //     // Update Matches
                    //     await dbHandler.updateUser(user._id, "matches_played", newActMatches.data.toString());
                    //     // Update Percentage
                    //     await dbHandler.updateUser(user._id, "percentage", newPercentage.toString());
                    //     // Update latest match id
                    //     await dbHandler.updateUser(user._id, "latest_match", match_id);
                    // } else {
                    //     console.log("Something went wrong with the data gathered... NOT UPDATING DB")
                    // }
            } else {
                console.log("Not bottom.")
            }
        }
    } catch (error) {
        console.log("Error Occured: ", error);
    } finally {
        console.log("\nShutting down...");
        process.exit(0);
    }     
})

client.login(token)