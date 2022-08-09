const discord = require('discord.js')
const fs = require('fs');

const { token, channelid } = require('./config.json');

const client = new discord.Client();

client.on('message', async message => {
    let data = fs.readFileSync('data.json');
    var leaderboard = JSON.parse(data)
    leaderboard = leaderboard["leaderboard"]

    if (message.content.toLowerCase() == '!scoreboard'){
        // Fields
        let fields = []

        for (var key of Object.keys(leaderboard)) {
            fields.push({name: key + ":", value: "Has bottom fragged " + String(leaderboard[key]) + " time/s"})
        }

        // Message embed
        embed = new discord.MessageEmbed()
                    .setColor(0xF21515)
                    .setTitle("Leaderboard")
                    .addFields(fields)
                    .setTimestamp()
                    .setFooter("Updated every 30 minutes")
        // Send message
        client.channels.cache.get(channelid).send(embed)
    }
})

client.login(token)
