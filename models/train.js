import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
  route: String,
  currentLocation: {
    latitude: Number,
    longitude: Number
  },
  timestamp: Date,
  path: [{ name: String, latitude: Number, longitude: Number }],
  engineHistory: [{
    engineId: String,
    detachedAt: Date,
    current: Boolean
  }]
});

const Train = mongoose.models.Train || mongoose.model('Train', trainSchema);

export default Train;
