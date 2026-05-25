import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['counter', 'image', 'icon'],
    default: 'counter'
  },
  value: {
    type: Number,
    required: function() { return this.type === 'counter'; }
  },
  suffix: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: function() { return this.type === 'image'; }
  },
  isIcon: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Stat', statSchema);
