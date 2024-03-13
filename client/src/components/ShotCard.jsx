export default function ShotCard({ shotCard, setShotCard, shotCardNames }) {
  return (
    <div>
      <div className="card">
        <h3 className="input">Shot Card Name</h3>
        <select
          className="card-item"
          value={shotCard}
          onChange={(e) => setShotCard(e.target.value)}
          data-testid="shot-card-select"
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
    </div>
  );
}
