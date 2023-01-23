const axios = require('axios');

async function getLatestMatch(user, tag){    
    return axios({
        method: 'get',
        url: 'https://api.henrikdev.xyz/valorant/v3/matches/ap/' + user +'/' + tag +'?filter=competitive'
    })
        .then( response => {
            return response.data.data[0].metadata.matchid
        })

	.catch(error => 
	{
	    return "Failed"
	})
}

async function getPositionInMatch(match_id, user){
    return axios({
        method: 'get',
        url: 'https://api.henrikdev.xyz/valorant/v2/match/' + match_id
    })
        .then( response => {
            var players = response.data.data.players.all_players
            var scores = []
            players.forEach(player => {
                scores.push([player.name , player.stats.score])
            });    

            scores.sort((scoreA, scoreB) => (scoreA[1] > scoreB[1]) ? 1 : -1)
            
            let position = -1
            if(scores[0][0].toLowerCase() === user.toLowerCase()) {
                position = 10
            }

            return position
        })
	.catch(error =>
        {
            return "Failed"
        })
}

module.exports = { getLatestMatch, getPositionInMatch}
