import express from 'express';
import Stat from '../models/Stat.js';

const router = express.Router();

// Get all stats sorted by displayOrder
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new stat
router.post('/', async (req, res) => {
  const stat = new Stat(req.body);
  try {
    const newStat = await stat.save();
    res.status(201).json(newStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a stat
router.put('/:id', async (req, res) => {
  try {
    const updatedStat = await Stat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    res.json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a stat
router.delete('/:id', async (req, res) => {
  try {
    const deletedStat = await Stat.findByIdAndDelete(req.params.id);
    if (!deletedStat) {
      return res.status(404).json({ message: 'Stat not found' });
    }
    res.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
