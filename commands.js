const discord = require('discord.js')

const { token } = require('./config.json');
const { leaderboard } = require('./data.json')

const client = new discord.Client();

client.on('message', async message => {
    if (message.content.toLowerCase() == '!leaderboard'){
        // Get data from data json
        // Message embed
        // Send message
    }
})

client.login(token)