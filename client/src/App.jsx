import { useEffect, useState } from "react";
import "./index.css";
import {
  createPrediction,
  fetchBowlCardNames,
  fetchPredictions,
  fetchShotCardNames,
  fetchShotTimingNames,
} from "./requests";

function App() {
  const [bowlCardNames, setBowlCardNames] = useState([]);
  const [shotCardNames, setShotCardNames] = useState([]);
  const [shotTimingNames, setShotTimingNames] = useState([]);
  const [bowlCard, setBowlCard] = useState("");
  const [shotCard, setShotCard] = useState("");
  const [shotTime, setShotTime] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchBowlCardNames().then((data) => setBowlCardNames(data));
    fetchShotCardNames().then((data) => setShotCardNames(data));
    fetchShotTimingNames().then((data) => setShotTimingNames(data));
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
    <>
      <div className="container">
        <div className="card">
          <span className="input">Bowl Card Name:</span>
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
          <span className="input">Shot Card Name:</span>
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
          <span className="input">Shot Timing:</span>
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
        <span className="chart-heading">Prediction Chart:</span>
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
    </>
  );
}

export default App;