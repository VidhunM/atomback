import express from 'express';
import multer from 'multer';
import path from 'path';
import Application from '../models/Application.js';

const router = express.Router();

// Multer Config for Resume
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /pdf|doc|docx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Only .pdf, .doc, and .docx files are allowed!');
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// @desc    Submit a job application
// @route   POST /api/applications
// @access  Public
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const { jobId, jobTitle, fullName, email, phone, coverLetter } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const application = new Application({
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      coverLetter,
      resume: `/${req.file.path.replace(/\\/g, '/')}`
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all applications (for admin)
// @route   GET /api/applications
// @access  Admin
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Admin
router.put('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application) {
      application.status = req.body.status || application.status;
      const updatedApplication = await application.save();
      res.json(updatedApplication);
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Admin
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (application) {
      await application.deleteOne();
      res.json({ message: 'Application removed' });
    } else {
      res.status(404).json({ message: 'Application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
