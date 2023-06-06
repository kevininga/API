import mongoose from 'mongoose';
import axios from 'axios';
import fs from 'fs';
import db from './connection.js'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();
let apiKey = process.env.apiKey


//Teams
const teamOptions = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=2022',
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

axios.request(teamOptions).then(function (response) {
  // Extract the data from the response
  const data = response.data;

  // Convert the data to JSON format
  const jsonData = JSON.stringify(data, null, 2);

  // Save the JSON data to a file
  fs.writeFile('../data/teams.json', jsonData, 'utf8', function (err) {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('Data has been seeded and saved to teams.json');
  });
}).catch(function (error) {
  console.error('Error retrieving data:', error);
});

const teams = ['33','34','35','36','39','40', '41', '42', '43', '45', '46', '47', '48', '49', '50', '51', '52', '55', '63', '65',  '66'];
let playerData = {};

const requests = teams.map(team => {
  const playerOptions = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
    params: {team: team},
    headers: {
      'X-RapidAPI-Key': 'faa093b0d4mshd46587634110526p1c8c58jsna79db5e0448b',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  return axios.request(playerOptions)
    .then(function (response) {
      // Add the data for this team to the overall player data
      playerData[team] = response.data;
    })
    .catch(function (error) {
      console.error('Error retrieving data for team', team, ':', error);
    });
});

Promise.all(requests)
  .then(() => {
    // Convert the player data to JSON format
    const jsonData = JSON.stringify(playerData, null, 2);

    // Save the player data to a file
    fs.writeFile('../data/players.json', jsonData, 'utf8', function (err) {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('Data has been seeded and saved to players.json');
    });
  });
