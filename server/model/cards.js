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

export async function getShotsForBowl(bowlCardName) {
  const shotCardArray = (
    await pool.query(
      "SELECT shot_card FROM shot_for_bowl WHERE bowl_card = $1",
      [bowlCardName]
    )
  ).rows[0].shot_card;
  return shotCardArray;
}

export async function getOutcomeForTiming(timing) {
  const outcomeArray = (
    await pool.query(
      "SELECT outcome FROM outcome_for_timing WHERE timing = $1",
      [timing]
    )
  ).rows[0].outcome;
  return outcomeArray;
}

export async function getPredictionsDB() {
  const result = await pool.query("SELECT * FROM prediction_chart");
  return result.rows;
}

export async function getPredictionForInput(inputString) {
  const result = (
    await pool.query("SELECT * FROM prediction_chart WHERE input = $1", [
      inputString,
    ])
  ).rows[0];
  return result;
}

export async function createPredictionDB(inputString, outputString) {
  const result = await pool.query(
    "INSERT INTO prediction_chart (input,output) VALUES ($1,$2) RETURNING *",
    [inputString, outputString]
  );
  return result.rows[0];
}

export async function deletePredictionDB(inputString) {
  await pool.query("DELETE FROM prediction_chart WHERE input = $1", [
    inputString,
  ]);
}

export async function getCommentryForOutcome(outcome) {
  const commentaryArray = (
    await pool.query(
      "SELECT * FROM commentary_for_outcome WHERE outcome = $1",
      [outcome]
    )
  ).rows[0].commentary;
  return commentaryArray;
}
