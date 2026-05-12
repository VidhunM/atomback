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

export default router;
