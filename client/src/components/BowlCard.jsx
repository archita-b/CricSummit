export default function BowlCard({ setBowlCard, bowlCard, bowlCardNames }) {
  return (
    <div>
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
    </div>
  );
}
