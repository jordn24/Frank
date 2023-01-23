const discord = require('discord.js')
const fs = require('fs');

const { token, channelid } = require('./config.json');

const client = new discord.Client();

client.on('message', async message => {
    let data = fs.readFileSync('data.json');
    var leaderboard = JSON.parse(data)
    leaderboard = leaderboard["leaderboard"]
    
    let data_arch = fs.readFileSync('all_time_data.json')

    var leaderboard_arch = JSON.parse(data_arch)
    leaderboard_arch = leaderboard_arch["leaderboard"]
    
    if (message.content.toLowerCase() == '!scoreboard'){
        // Fields
        let fields = []
	let index = 1

        for (var key of Object.keys(leaderboard)) {
            fields.push({name: key + ":", value: "Has bottom fragged " + String(leaderboard[key]) + " time/s", 
		raw_value: leaderboard[key]
	    })
	}

	fields.sort((fieldA, fieldB) => (fieldA.raw_value < fieldB.raw_value) ? 1 : -1)

	fields.forEach((field) => {
		field.name = index + ". " + field.name
		index = index + 1
	})

        // Message embed
        embed = new discord.MessageEmbed()
                    .setColor(0xF21515)
                    .setTitle("Leaderboard")
                    .addFields(fields)
                    .setTimestamp()
                    .setFooter("Updated every 30 minutes")
        // Send message
        message.channel.send(embed)
    }
   
     if (message.content.toLowerCase() == '!alltime'){
        // Fields
        let fields = []
        let index = 1

        for (var key of Object.keys(leaderboard_arch)) {
            fields.push({name: key + ":", value: "Has bottom fragged " + String(leaderboard_arch[key]) + " time/s",
                raw_value: leaderboard_arch[key]
            })
        }

        fields.sort((fieldA, fieldB) => (fieldA.raw_value < fieldB.raw_value) ? 1 : -1)

        fields.forEach((field) => {
                field.name = index + ". " + field.name
                index = index + 1
        })

        // Message embed
        embed = new discord.MessageEmbed()
                    .setColor(0xF21515)
                    .setTitle("Leaderboard")
                    .addFields(fields)
                    .setTimestamp()
                    .setFooter("Updated every episode")
        // Send message
        message.channel.send(embed)
    }
   if (message.content.toLowerCase() == '!update') {
	var exec = require('child_process').exec, child;
	
	child = exec('node index.js',
		function (error, stdout, stderr) {
			console.log(stdout)
			console.log(stderr)
			if (error != null) {
				console.log(error)
			}
		});
        message.reply("Updating now.")
   }
})

client.login(token)
