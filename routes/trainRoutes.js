import { addTrain, getTrains, findById, changeEngine, } from "../controllers/trainController.js";
import express from "express";

const router = express.Router();

router.post('/add', addTrain);
router.get('/get', getTrains);
router.get('/get/:id', findById);
router.post('/switch-engine/:id', changeEngine);
// router.get('/getLocationHistory/', getLocationHistory);


export default router;
