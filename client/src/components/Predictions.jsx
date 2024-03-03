export default function Predictions({ predictions }) {
  return (
    <div>
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
    </div>
  );
}
