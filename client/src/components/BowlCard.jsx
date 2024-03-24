import React from "react";

export default function BowlCard({ setBowlCard, bowlCard, bowlCardNames }) {
  return (
    <div className="card">
      <h3 className="input">Bowl Card Name</h3>
      <select
        className="card-item"
        data-testid="bowl-card-select"
        value={bowlCard}
        onChange={(e) => {
          setBowlCard(e.target.value);
        }}
      >
        <option value="default">select</option>
        {bowlCardNames.map((card) => {
          return (
            <option key={card.id} value={card.bowl_card_name}>
              {card.bowl_card_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
