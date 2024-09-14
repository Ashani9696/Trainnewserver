import cron from 'node-cron';
import LocationHistory from '../models/LocationHistory.js';
import BackupLocationHistory from '../models/BackupLocationHistory.js';

// Function to backup old location history
const backupOldLocationHistory = async () => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 90); // records older than 90 days

  try {
    // Fetch all trains' location history
    const allTrains = await LocationHistory.find();
    if (allTrains.length) {
      const backupData = allTrains.map(train => ({
        engineId: train.engineId,
        travelHistory: train.travelHistory
      }));

      // Insert the backup data into BackupLocationHistory collection
      await BackupLocationHistory.create({ trains: backupData });

      // Delete old records from LocationHistory
      await LocationHistory.deleteMany({ 'travelHistory.timestamp': { $lt: cutoffDate } });
      
      console.log(`Successfully moved location history records to backup.`);
    } else {
      console.log('No records older than 90 days to backup.');
    }
  } catch (error) {
    console.error('Error during backup:', error);
  }
};

// Run backup function automatically every 90 days
// Adjust the cron schedule to match your requirements
cron.schedule('0 0 1 */3 *', () => {
  console.log('Running automatic backup job...');
  backupOldLocationHistory();
});

export { backupOldLocationHistory };
