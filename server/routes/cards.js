import express from "express";
import {
  createPrediction,
  getCardNames,
  getPredictions,
} from "../controller/cards.js";

const router = express.Router();

router.get("/cards", getCardNames);

router.get("/prediction", getPredictions);
router.post("/prediction", createPrediction);

export default router;
