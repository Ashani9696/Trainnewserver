

// import mongoose from 'mongoose';
// import { backupOldLocationHistory } from '../server/controllers/backupController.js';  // Ensure the path is correct

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to MongoDB');

//     // Run the backup function
//     try {
//       await backupOldLocationHistory();
//       console.log('Backup completed successfully');
//     } catch (error) {
//       console.error('Error running backup:', error);
//     } finally {
//       mongoose.disconnect();
//     }
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//   });
