import React from "react";
import { useState } from "react";

export default function SuperOver({
  shotCard,
  shotTime,
  setShotCard,
  setShotTime,
  predictions,
}) {
  const [bowlCardsForSuperOver, setBowlCardsForSuperOver] = useState([
    "Bouncer",
    "Inswinger",
    "Outswinger",
    "Leg cutter",
    "Off cutter",
    "Pace",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wicketsAvailable, setWicketsAvailable] = useState(2);

  const target = 20;
  const initialWicketsAvailable = 2;
  const bowler = "Sudhakar";
  const batters = ["Craig", "Chris", "Martin"];

  const currentBowlCard = bowlCardsForSuperOver[currentIndex];

  function inputForBowlCard(bowlCard) {
    let input = "";
    if (shotCard !== "" && shotTime !== "") {
      input = `${bowlCard} ${shotCard} ${shotTime}`;
    }
    return input;
  }

  const inputForCurrentBowlCard = inputForBowlCard(currentBowlCard);

  const predictionForCurrentBowlCard = predictions.find(
    (prediction) => prediction.input === inputForCurrentBowlCard
  );

  const currentInput = predictionForCurrentBowlCard?.input;
  const currentOutput = predictionForCurrentBowlCard?.output;

  function shotOutcome(output) {
    if (!output) return null;

    const commentaryPlusOutcome = output.split("-");

    const outcome = commentaryPlusOutcome[1].trim();

    if (outcome.endsWith("run") || outcome.endsWith("runs")) {
      const regex = /\d+/;
      const matches = outcome.match(regex);
      const runs = parseInt(matches[0]);
      return runs;
    }
    return "wicket";
  }

  const currentShotOutcome = shotOutcome(currentOutput);

  function handleNextBtnClick() {
    setCurrentIndex(currentIndex + 1);
    if (currentShotOutcome !== "wicket") {
      setScore((score) => {
        return currentShotOutcome
          ? Number(score) + Number(currentShotOutcome)
          : Number(score);
      });
    } else {
      setWicketsAvailable(wicketsAvailable - 1);
    }
    setShotCard("");
    setShotTime("");
  }

  return (
    <>
      <h2>Super Over</h2>

      <div className="super-over-container">
        <div className="super-over-details">
          <h4>Bowling cards</h4>
          <ol>
            {bowlCardsForSuperOver.map((card, index) => {
              return (
                <li
                  key={index}
                  className={currentIndex === index ? "super-over-bowl" : ""}
                >
                  {card}
                </li>
              );
            })}
          </ol>

          <h4>
            India 11 target: <span>{target}</span>
          </h4>

          <h4>
            Wickets Available Initially: <span>{initialWicketsAvailable}</span>
          </h4>
        </div>

        <div className="output-details">
          <h3>Output</h3>

          {currentIndex < bowlCardsForSuperOver.length &&
          score <= target &&
          wicketsAvailable !== 0 ? (
            currentInput && (
              <div>
                <p>
                  {currentIndex + 1}. {bowler} bowled {currentBowlCard} ball
                </p>
                <p>
                  {batters[0]} played {shotTime} {shotCard} shot
                </p>
                <p>{currentOutput}</p>
              </div>
            )
          ) : (
            <div>
              <h4>Australia scored: {score} runs</h4>
              {score <= target ? (
                <h4>Australia lost by {target - score} runs</h4>
              ) : (
                <h4>Australia won by {wicketsAvailable} wickets</h4>
              )}
            </div>
          )}
        </div>

        <div className="output-message">
          <button
            className="next-button"
            disabled={!shotCard || !shotTime}
            onClick={handleNextBtnClick}
          >
            Next
          </button>

          <h4>Score: {score}</h4>
          <h4>Wickets Available: {wicketsAvailable}</h4>
        </div>
      </div>
    </>
  );
}
