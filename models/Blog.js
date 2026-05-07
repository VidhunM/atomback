import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    name: String,
    role: String
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  imageUrl: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
