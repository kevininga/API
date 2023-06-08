import mongoose from 'mongoose';
import Team from '../models/teams.js';
import Player from '../models/players.js';
import db from './connection.js';
import teamRawData from '../data/teams.json' assert {type: 'json'}
import playerRawData from '../data/players.json' assert {type: 'json'}

console.log(teamRawData)
console.log(playerRawData);


//Teams Data
let teamData = teamRawData.response.map(team => {
    return {
    team: {
        name: team.team.name
    },
    venue:{
        name: team.venue.name,
        city: team.venue.city,
        capacity: team.venue.capacity    
    }
    }
})



let makeTeams = async() => {
    try {
        await Team.deleteMany()
        await Team.create(teamData)
        console.log('Team created and seeded')
        // mongoose.connection.close()
    }
    catch(error) {
        console.error('Error: ', error)
    }
}

makeTeams()


// Players Data
let playerData = playerRawData.response.flatMap(team => 
    team.players.map(player => {
      return {
          name: player.name,
          age: player.age,
          number: player.number,
          position: player.position,
          team: {
              name: team.team.name
          }
      }
    })
  );
  

let makePlayers = async() => {
    try {
        await Player.deleteMany()
        await Player.create(playerData)
        console.log('Player created and seeded')
        // mongoose.connection.close()
    }
    catch(error) {
        console.error('Error: ', error)
    }
}

makePlayers()