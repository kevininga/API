import express from 'express';
import Player from '../models/players.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find({});
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player == null) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all players by team name
router.get('/team/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const players = await Player.find({ 'team.name': teamName });

    if (players.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get all players by number
router.get('/number/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const players = await Player.find({ number });

    if (players.length === 0) {
      // No players with the specified number were found
      return res.status(404).json({ error: 'No players with this number were found' });
    }

    res.status(200).json(players);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get a single player by name
router.get('/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const player = await Player.findOne({ name });

    if (!player) {
      // Player with the specified firstname and lastname was not found
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a new player
router.post('/', async (req, res) => {
  const player = req.body;

  try {
    const response = await Player.create(player);
    res.status(200).json({
      status: 200,
      message: 'Successfully added a new player',
      body: response,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

// Update a single player by name
router.put('/name/:name', async (req, res) => {
  const { name } = req.params;
  const { age, number, position, team } = req.body; // destructure team from req.body

  try {
    const player = await Player.findOneAndUpdate(
      { name: name },
      { age: age, number: number, position: position, 'team.name': team.name }, // specify team.name as a property to update
      { new: true } // options object - { new: true } to return updated document
    );

    if (!player) {
      // Player with the specified firstname and lastname was not found
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully updated the player',
      body: player,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

// Delete a player by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Player.findByIdAndRemove(id);
    res.status(200).json({
      status: 200,
      message: `Successfully removed the player`,
      body: response,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

//Delete a player by name
router.delete('/name/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const response = await Player.findOneAndRemove({ name });
    res.status(200).json({
      status: 200,
      message: `Successfully removed the player`,
      body: response,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
});

export default router
