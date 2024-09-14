import LocationHistory from '../models/LocationHistory.js';
import BackupLocationHistory from '../models/BackupLocationHistory.js';

// Get location history for a specific train
export const getLocationHistoryByTrain = async (req, res) => {
  const { engineId } = req.params;
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 90);

  try {
    const train = await LocationHistory.findOne({ engineId });
    if (train) {
      const recentHistory = train.travelHistory.filter(
        (entry) => entry.timestamp >= fromDate
      );
      res.status(200).json(recentHistory);
    } else {
      res.status(404).json({ message: 'Train not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get backup location history of a specific train
export const getBackupLocationHistory = async (req, res) => {
  const { engineId } = req.params;

  try {
    const history = await BackupLocationHistory.find({ engineId });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getAllLocationHistories = async (req, res) => {
  try {
    const allHistories = await LocationHistory.find();
    // Format the response to match the frontend expectations
    res.status(200).json({ data: allHistories, totalPages: 1 }); // Assuming totalPages is 1 for simplicity
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// LocationHistoryController.js
export const getLast20Records = async (req, res) => {
  const { engineId } = req.params;
  try {
    const train = await LocationHistory.findOne({ engineId });
    if (train) {
      const recentHistory = train.travelHistory.slice(-20); // Get the last 20 records
      res.status(200).json(recentHistory);
    } else {
      res.status(404).json({ message: 'Train not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
