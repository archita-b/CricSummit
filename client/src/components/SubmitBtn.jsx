export default function SubmitBtn({
  submitInput,
  bowlCard,
  shotCard,
  shotTime,
}) {
  return (
    <div>
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
  );
}
