import {
  createPredictionDB,
  getBowlCardsDB,
  getCommentryForOutcome,
  getOutcomeForTiming,
  getPredictionForInput,
  getPredictionsDB,
  getShotCardsDB,
  getShotTimingsDB,
  getShotsForBowlDB,
} from "../model/cards.js";

export async function getCardNames(req, res) {
  try {
    const bowlCardNames = await getBowlCardsDB();
    const shotCardNames = await getShotCardsDB();
    const shotTiming = await getShotTimingsDB();

    res.status(200).json({
      bowlCardNames: bowlCardNames,
      shotCardNames: shotCardNames,
      shotTimings: shotTiming,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getPredictions(req, res) {
  try {
    const predictions = await getPredictionsDB();
    res.status(200).json(predictions);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function createPrediction(req, res) {
  try {
    const { bowlCardName, shotCardName, shotTiming } = req.body;

    if (!bowlCardName || !shotCardName || !shotTiming) {
      return res
        .status(400)
        .json({ error: "Please provide all the three inputs" });
    }

    const inputString = `${bowlCardName} ${shotCardName} ${shotTiming}`;
    const prediction = await getPredictionForInput(inputString);

    if (prediction !== undefined) {
      res.status(200).json(prediction);
    } else {
      const shotCardArray = await getShotsForBowlDB(bowlCardName);
      const outcomeArray = await getOutcomeForTiming(shotTiming);

      let outputString = "";

      if (shotCardArray.includes(shotCardName)) {
        outputString = Math.random() < 0.5 ? outcomeArray[0] : outcomeArray[1];
      } else {
        outputString = Math.random() < 0.5 ? "1 run" : "1 wicket";
      }

      const commentaryArray = await getCommentryForOutcome(outputString);
      let commentary = "";
      if (commentaryArray.length === 1) {
        commentary = commentaryArray[0];
      } else {
        commentary =
          Math.random() < 0.5 ? commentaryArray[0] : commentaryArray[1];
      }
      outputString = `${commentary} - ${outputString}`;

      const newPrediction = await createPredictionDB(inputString, outputString);
      res.status(201).json(newPrediction);
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
}
