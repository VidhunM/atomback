import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 5
  }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
