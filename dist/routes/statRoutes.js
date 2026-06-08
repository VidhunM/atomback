import express from 'express';
import Stat from '../models/Stat.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const stat = new Stat(req.body);
  try {
    const newStat = await stat.save();
    res.status(201).json(newStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedStat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
