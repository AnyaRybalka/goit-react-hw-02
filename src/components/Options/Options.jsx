const Options = ({ handleClick, totalFeedback, handleDelete }) => {
  return (
    <div>
      <button onClick={() => handleClick("good")}>Good</button>
      <button onClick={() => handleClick("neutral")}>Neutral</button>
      <button onClick={() => handleClick("bad")}>Bad</button>
      {totalFeedback ? <button onClick={handleDelete}>Reset</button> : null}
    </div>
  );
};

export default Options;