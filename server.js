import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/applications', applicationRoutes);

// Admin Auth Route
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  // Use env variables or defaults for admin credentials
  const adminUser = process.env.ADMIN_USER || 'admin';
  const adminPass = process.env.ADMIN_PASS || 'atomlifts123';
  
  if (username === adminUser && password === adminPass) {
    res.json({ success: true, token: 'admin-auth-token-valid' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/atomlifts';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
