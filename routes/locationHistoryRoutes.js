import express from 'express';
import { getAllLocationHistories, getBackupLocationHistory, getLast20Records } from '../controllers/locationHistoryController.js';

const router = express.Router();

router.get('/', getAllLocationHistories);
router.get('/backup/:engineId', getBackupLocationHistory);
router.get('/last-20/:engineId', getLast20Records);

export default router;
