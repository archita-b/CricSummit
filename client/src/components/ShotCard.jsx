import React from "react";

export default function ShotCard({ shotCard, setShotCard, shotCardNames }) {
  return (
    <div className="card">
      <h3 className="input">Shot Card Name</h3>
      <select
        className="card-item"
        data-testid="shot-card-select"
        value={shotCard}
        onChange={(e) => setShotCard(e.target.value)}
      >
        <option value="default">select</option>
        {shotCardNames.map((card) => {
          return (
            <option key={card.id} value={card.shot_card_name}>
              {card.shot_card_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
