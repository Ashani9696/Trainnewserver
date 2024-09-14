// routes/backupRoutes.js
import express from 'express';
import { backupOldLocationHistory, getBackupByDateRange } from '../controllers/backupController.js';

const router = express.Router();

// Route to trigger manual backup
router.post('/trigger-backup', async (req, res) => {
  try {
    await backupOldLocationHistory();
    res.status(200).send('Backup completed successfully');
  } catch (error) {
    res.status(500).send('Error running backup');
  }
});

// Route to get backup by date range
router.get('/by-date', getBackupByDateRange);

export default router;
