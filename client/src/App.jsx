import { useEffect, useState } from "react";
import "./index.css";
import { createPrediction, fetchCardNames, fetchPredictions } from "./requests";
import SuperOver from "./components/SuperOver";

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
    fetchPredictions().then((data) => setPredictions(data));
  }, []);

  function submitInput(bowlCard, shotCard, shotTime) {
    const newPrediction = {
      input: "",
      output: "",
    };
    createPrediction(bowlCard, shotCard, shotTime).then((data) => {
      if (data.error === "Please provide all the three inputs")
        alert("Provide all the inputs");

      setPredictions((prevPredictions) => {
        return [...prevPredictions, { ...newPrediction, ...data }];
      });
      setBowlCard("");
      setShotCard("");
      setShotTime("");
      return data;
    });
  }

  return (
    <div className="app-container">
      <div>
        <div className="heading">
          <h1>CricSummit</h1>
        </div>

        <div className="container">
          <div className="card">
            <h3 className="input">Bowl Card Name</h3>
            <select
              className="card-item"
              value={bowlCard}
              onChange={(e) => {
                setBowlCard(e.target.value);
              }}
            >
              <option>select</option>
              {bowlCardNames.map((card) => {
                return (
                  <option key={card.id} value={card.bowl_card_name}>
                    {card.bowl_card_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="card">
            <h3 className="input">Shot Card Name</h3>
            <select
              className="card-item"
              value={shotCard}
              onChange={(e) => setShotCard(e.target.value)}
            >
              <option>select</option>
              {shotCardNames.map((card) => {
                return (
                  <option key={card.id} value={card.shot_card_name}>
                    {card.shot_card_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="card">
            <h3 className="input">Shot Timing</h3>
            <select
              className="card-item"
              value={shotTime}
              onChange={(e) => setShotTime(e.target.value)}
            >
              <option>select</option>
              {shotTimingNames.map((timing) => {
                return (
                  <option key={timing.id} value={timing.shot_timing_name}>
                    {timing.shot_timing_name}
                  </option>
                );
              })}
            </select>
          </div>

          <span>
            <button
              type="submit"
              className="submit-input-btn"
              onClick={() => {
                submitInput(bowlCard, shotCard, shotTime);
              }}
            >
              submit input
            </button>
          </span>
        </div>

        <div className="prediction-chart">
          <h2 className="chart-heading">Prediction Chart</h2>
          <table>
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction, index) => (
                <tr key={index}>
                  <td>{prediction.input}</td>
                  <td>{prediction.output}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
