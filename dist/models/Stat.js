import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, enum: ['counter', 'image', 'icon'], default: 'counter' },
  value: { type: Number },
  suffix: { type: String, default: '' },
  image: { type: String, default: '' },
  isIcon: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Stat', StatSchema);
