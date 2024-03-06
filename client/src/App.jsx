import { useEffect, useState } from "react";
import "./index.css";
import { createPrediction, fetchCardNames, fetchPredictions } from "./requests";
import SuperOver from "./components/SuperOver";
import Predictions from "./components/Predictions";
import BowlCard from "./components/BowlCard";
import ShotCard from "./components/ShotCard";
import ShotTime from "./components/ShotTime";
import SubmitBtn from "./components/SubmitBtn";

function App() {
  const [bowlCardNames, setBowlCardNames] = useState([]);
  const [shotCardNames, setShotCardNames] = useState([]);
  const [shotTimingNames, setShotTimingNames] = useState([]);
  const [bowlCard, setBowlCard] = useState("");
  const [shotCard, setShotCard] = useState("");
  const [shotTime, setShotTime] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchCardNames().then((data) => {
      setBowlCardNames(data.cardNames.bowlCardNames);
      setShotCardNames(data.cardNames.shotCardNames);
      setShotTimingNames(data.cardNames.shotTimings);
    });
    fetchPredictions().then((data) => setPredictions(data.predictions));
  }, []);

  function submitInput(bowlCard, shotCard, shotTime) {
    const newPrediction = {
      input: "",
      output: "",
    };
    createPrediction(bowlCard, shotCard, shotTime).then((data) => {
      if (data.error === "Please provide all the three inputs") {
        alert("Provide all the inputs");
      } else {
        const inputString = `${bowlCard} ${shotCard} ${shotTime}`;
        const predictionForInputString = predictions.find(
          (prediction) => prediction.input === inputString
        );
        if (!predictionForInputString)
          setPredictions((prevPredictions) => {
            return [...prevPredictions, { ...newPrediction, ...data }];
          });
      }

      setBowlCard("");
      setShotCard("");
      setShotTime("");
    });
  }

  return (
    <div className="app-container">
      <div>
        <div className="heading">
          <h1>CricSummit</h1>
        </div>

        <div className="card-container">
          <BowlCard
            bowlCard={bowlCard}
            setBowlCard={setBowlCard}
            bowlCardNames={bowlCardNames}
          />

          <ShotCard
            shotCard={shotCard}
            setShotCard={setShotCard}
            shotCardNames={shotCardNames}
          />

          <ShotTime
            shotTime={shotTime}
            setShotTime={setShotTime}
            shotTimingNames={shotTimingNames}
          />

          <SubmitBtn
            submitInput={submitInput}
            bowlCard={bowlCard}
            shotCard={shotCard}
            shotTime={shotTime}
          />
        </div>

        <Predictions predictions={predictions} />

        <SuperOver
          shotCard={shotCard}
          setShotCard={setShotCard}
          shotTime={shotTime}
          setShotTime={setShotTime}
          predictions={predictions}
        />
      </div>
    </div>
  );
}

export default App;
