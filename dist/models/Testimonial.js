import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 5 },
  image: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Testimonial', TestimonialSchema);
