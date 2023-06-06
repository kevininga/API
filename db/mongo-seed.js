import mongoose from 'mongoose';
import Team from '../models/teams.js';
import Player from '../models/players.js';
import db from './connection.js';
import teamRawData from '../data/teams.json' assert {type: 'json'}
import playerRawData from '../data/players.json' assert {type: 'json'}

//Teams Data
let teamData = teamRawData.map(team => {
    return {
    team: {
        name: team.name
    },
    venue:{
        name: team.name,
        city: team.city,
        capacity: team.capacity    
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
let playerData = playerRawData.map(player => {
    return {
        name: player.name,
        age: player.age,
        number: player.number,
        position: player.position,
        team: {
            name: player.name
        }
    }
})

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