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
    const bowl_cards_name = await getBowlCardsDB();
    const shot_cards_name = await getShotCardsDB();
    const shot_timing = await getShotTimingsDB();

    res.status(200).json({
      bowlCardNames: bowl_cards_name,
      shotCardNames: shot_cards_name,
      shotTimings: shot_timing,
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
    const { bowl_card_name, shot_card_name, shot_timing } = req.body;

    if (!bowl_card_name || !shot_card_name || !shot_timing) {
      return res.json({ error: "Please provide all the three inputs" });
    }

    const input_string = `${bowl_card_name} ${shot_card_name} ${shot_timing}`;
    const prediction = await getPredictionForInput(input_string);

    if (prediction !== undefined) {
      res.status(200).json(prediction);
    } else {
      const shot_card_array = await getShotsForBowlDB(bowl_card_name);
      const outcome_array = await getOutcomeForTiming(shot_timing);

      let output_string = "";

      if (shot_card_array.includes(shot_card_name)) {
        output_string =
          Math.random() < 0.5 ? outcome_array[0] : outcome_array[1];
      } else {
        output_string = Math.random() < 0.5 ? "1 run" : "1 wicket";
      }

      const commentary_array = await getCommentryForOutcome(output_string);
      let commentary = "";
      if (commentary_array.length === 1) {
        commentary = commentary_array[0];
      } else {
        commentary =
          Math.random() < 0.5 ? commentary_array[0] : commentary_array[1];
      }
      output_string = `${commentary} - ${output_string}`;

      const newPrediction = await createPredictionDB(
        input_string,
        output_string
      );
      res.status(201).json(newPrediction);
    }
  } catch (error) {
    return res.json({ error: error.message });
  }
}
