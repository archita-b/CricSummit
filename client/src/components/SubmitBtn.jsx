export default function SubmitBtn() {
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
