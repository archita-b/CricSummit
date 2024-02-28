import express from "express";
import {
  createPrediction,
  getBowlCards,
  getPredictions,
  getShotCards,
  getShotTimings,
} from "../controller/cards.js";

const router = express.Router();

router.get("/bowl", getBowlCards);
router.get("/shot", getShotCards);
router.get("/timing", getShotTimings);

router.get("/prediction", getPredictions);
router.post("/prediction", createPrediction);

export default router;
