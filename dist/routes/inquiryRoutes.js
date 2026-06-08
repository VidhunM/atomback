import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// @route   POST api/inquiries
// @desc    Submit a new inquiry (contact or quote)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, type, projectType, message } = req.body;

        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            type,
            projectType,
            message
        });

        const inquiry = await newInquiry.save();
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/inquiries
// @desc    Get all inquiries
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/inquiries/:id
// @desc    Update inquiry status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        inquiry.status = status;
        await inquiry.save();
        res.json(inquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/inquiries/:id
// @desc    Delete an inquiry
router.delete('/:id', async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);

        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }

        await Inquiry.deleteOne({ _id: req.params.id });
        res.json({ message: 'Inquiry removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
