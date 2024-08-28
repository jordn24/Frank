import 'dotenv/config'

import axios from 'axios';

interface PlayerObject {
    name: string,
    stats: {
        score: number;
    }
}

export default async function didBottomFrag(user: string, tag: string) {

    try {
        let response = await axios.get('https://api.henrikdev.xyz/valorant/v3/matches/ap/' + user + '/'  + tag, {
            params: {
                'api_key': process.env.VALORANTAPIKEY
            }
        })

        let index = 0;
        while(index < response.data.data.length){
            if(response.data.data[index].is_available){
                break;
            }
            index = index + 1;
        }
        
        let players = response.data.data[index].players.all_players;
    
        let sortedPlayers = players.sort((scoreA: PlayerObject, scoreB: PlayerObject) => (scoreA.stats.score > scoreB.stats.score ? 1 : -1));
    
        if(sortedPlayers[0].name.toLowerCase() === user.toLowerCase()) {return response.data.data[index].metadata.matchid}
    
        return false;   
    } catch (error) {
        console.log(error)
        return false;
    }
}

