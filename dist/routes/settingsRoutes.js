import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// Get setting by key
router.get('/:key', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update or create setting
router.post('/', async (req, res) => {
  const { key, value } = req.body;
  try {
    let setting = await Settings.findOne({ key });
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = new Settings({ key, value });
      await setting.save();
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
