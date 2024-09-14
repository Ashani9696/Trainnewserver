import mongoose from 'mongoose';

const backupLocationHistorySchema = new mongoose.Schema({
  backupDate: { type: Date, default: Date.now },
  trains: [
    {
      engineId: { type: String, required: true },
      travelHistory: [
        {
          timestamp: { type: Date, required: true },
          location: { type: String, required: true },
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true }
        }
      ]
    }
  ]
});

export default mongoose.model('BackupLocationHistory', backupLocationHistorySchema);
