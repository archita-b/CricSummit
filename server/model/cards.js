import pool from "./db.js";

export async function getBowlCardsDB() {
  const result = await pool.query("SELECT * FROM bowl_cards_name");
  return result.rows;
}

export async function getShotCardsDB() {
  const result = await pool.query("SELECT * FROM shot_cards_name");
  return result.rows;
}

export async function getShotTimingsDB() {
  const result = await pool.query("SELECT * FROM shot_timing");
  return result.rows;
}

export async function getShotsForBowlDB(bowl_card_name) {
  const shot_card_array = (
    await pool.query(
      "SELECT shot_card FROM shot_for_bowl WHERE bowl_card = $1",
      [bowl_card_name]
    )
  ).rows[0].shot_card;
  return shot_card_array;
}

export async function getOutcomeForTiming(timing) {
  const outcome_array = (
    await pool.query(
      "SELECT outcome FROM outcome_for_timing WHERE timing = $1",
      [timing]
    )
  ).rows[0].outcome;
  return outcome_array;
}

export async function getPredictionsDB() {
  const result = await pool.query("SELECT * FROM prediction_chart");
  return result.rows;
}

export async function getPredictionForInput(input_string) {
  const result = (
    await pool.query("SELECT * FROM prediction_chart WHERE input = $1", [
      input_string,
    ])
  ).rows[0];
  return result;
}

export async function createPredictionDB(input_string, output_string) {
  const result = await pool.query(
    "INSERT INTO prediction_chart (input,output) VALUES ($1,$2) RETURNING *",
    [input_string, output_string]
  );
  return result.rows[0];
}

export async function getCommentryForOutcome(outcome) {
  const commentary_array = (
    await pool.query(
      "SELECT * FROM commentary_for_outcome WHERE outcome = $1",
      [outcome]
    )
  ).rows[0].commentary;
  return commentary_array;
}
