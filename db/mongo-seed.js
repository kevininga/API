import mongoose from 'mongoose';
import Team from '../models/teams.js';
import Player from '../models/players.js';
import db from './connection.js';
import teamRawData from '../data/teams.json' assert {type: 'json'};
import playerRawData from '../data/players.json' assert {type: 'json'};

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
  };
});

let makeTeams = async () => {
  try {
    await Team.deleteMany();
    await Team.create(teamData);
    console.log('Teams created and seeded');
  } catch (error) {
    console.error('Error: ', error);
  }
};

makeTeams();

// Players Data
let playerData = Object.values(playerRawData).flatMap(teamData => {
  const team = teamData.response[0].team;
  return teamData.response[0].players.map(player => {
    return {
      name: player.name,
      age: player.age,
      number: player.number,
      position: player.position,
      team: {
        name: team.name
      }
    };
  });
});

let makePlayers = async () => {
  try {
    await Player.deleteMany();
    await Player.create(playerData);
    console.log('Players created and seeded');
  } catch (error) {
    console.error('Error: ', error);
  }
};

makePlayers();
