import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blogRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);

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
