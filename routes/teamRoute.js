import express from 'express';
import Team from '../models/teams.js';

const router = express.Router();

// Get all teams
router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Find OneTeam
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findById(id);
      
      if (!team) {
        // Team with the specified ID was not found
        return res.status(404).json({ error: 'Team not found' });
      }
      
      res.status(200).json(team);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get a Team by Name
  router.get('/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const team = await Team.findOne({ name });
      if (!team) {
        // Team with the specified name was not found
        return res.status(404).json({ error: 'Team not found' });
      }
  
      res.status(200).json(team);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  
  
  // Create a new team
  router.post('/', async (req, res) => {
    const team = req.body;
  
    try {
      const response = await Team.create(team);
      res.status(200).json({
        status: 200,
        message: 'Successfully added a new team',
        body: response,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  });
  
  // update team
  const updateTeam = async (req, res) => {
      const { id } = req.params;
      try {
          const updatedTeam = await Team.findByIdAndUpdate(id, req.body, { new: true });
          if (!updatedTeam) {
              return res.status(404).json({ message: 'Team not found' });
          }
          res.status(200).json(updatedTeam);
      } catch (error) {
          res.status(400).json({ message: error.message });
      }
  };
  
  // Delete a single team by id
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await Team.findByIdAndRemove(id);
      res.status(200).json({
        status: 200,
        message: `Successfully removed the team`,
        body: response,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  });
  
  // Delete team by team name
  router.delete('/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const response = await Team.findOneAndRemove({ name });
      if (!response) {
        // Team with the specified name was not found
        return res.status(404).json({ error: 'Team not found' });
      }
      
      res.status(200).json({
        status: 200,
        message: `Successfully removed the team`,
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