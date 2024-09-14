import LocationHistory from '../models/LocationHistory.js';
import BackupLocationHistory from '../models/BackupLocationHistory.js';
import cron from 'node-cron';

// Function to backup old location history
export const backupOldLocationHistory = async () => {
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

      // Insert the backup data into the BackupLocationHistory collection
      await BackupLocationHistory.create({ trains: backupData });

      // Delete old records from LocationHistory
      await LocationHistory.deleteMany({ 'travelHistory.timestamp': { $lt: cutoffDate } });
      
      console.log('Successfully moved old location history records to backup.');
    } else {
      console.log('No records older than 90 days to backup.');
    }
  } catch (error) {
    console.error('Error during backup:', error);
  }
};


export const backupAndDeleteLocationHistory = async () => {
  try {
    // Fetch all trains' location history
    const allTrains = await LocationHistory.find();
    if (allTrains.length) {
      const backupData = allTrains.map(train => ({
        engineId: train.engineId,
        travelHistory: train.travelHistory
      }));

      // Insert the backup data into the BackupLocationHistory collection
      await BackupLocationHistory.create({ trains: backupData });

      // Delete all records from LocationHistory
      await LocationHistory.deleteMany({});
      
      console.log('Successfully backed up and deleted all location history records.');
    } else {
      console.log('No records to backup.');
    }
  } catch (error) {
    console.error('Error during backup and delete:', error);
  }
};


// // Function to get backup by date range
// export const getBackupByDateRange = async (req, res) => {
//   const { startDate, endDate } = req.query;

//   try {
//     const backups = await BackupLocationHistory.find({
//       backupDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
//     });

//     res.status(200).json(backups);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };



cron.schedule('0 0 1 */3 *', () => { // Runs every 90 days
  console.log('Running automatic backup job...');
  backupOldLocationHistory();
});



// cron.schedule('* * * * *', () => { // Runs every minute
//   console.log('Running automatic backup job...');
//   backupOldLocationHistory();
// });