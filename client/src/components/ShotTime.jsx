export default function ShotTime({ shotTime, setShotTime, shotTimingNames }) {
  return (
    <div>
      <div className="card">
        <h3 className="input">Shot Timing</h3>
        <select
          className="card-item"
          value={shotTime}
          onChange={(e) => setShotTime(e.target.value)}
          data-testid="shot-time-select"
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
    </div>
  );
}
