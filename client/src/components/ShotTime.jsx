import React from "react";

export default function ShotTime({ shotTime, setShotTime, shotTimingNames }) {
  return (
    <div className="card">
      <h3 className="input">Shot Timing</h3>
      <select
        className="card-item"
        data-testid="shot-time-select"
        value={shotTime}
        onChange={(e) => setShotTime(e.target.value)}
      >
        <option value="default">select</option>
        {shotTimingNames.map((timing) => {
          return (
            <option key={timing.id} value={timing.shot_timing_name}>
              {timing.shot_timing_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
