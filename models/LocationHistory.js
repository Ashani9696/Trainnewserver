// LocationHistory.js
import mongoose from 'mongoose';

const locationHistorySchema = new mongoose.Schema({
  engineId: { type: String, required: true, unique: true },
  travelHistory: [
    {
      timestamp: { type: Date, required: true },
      location: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    }
  ]
});

export default mongoose.model('LocationHistory', locationHistorySchema);
