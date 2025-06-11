import React, { useState } from "react";
import { useCharacterMovieMatchGame } from "../../hooks/useQuizGameModes";

// PUBLIC_INTERFACE
export default function CharacterMovieMatch({ onBack, onFinish }) {
  const {
    state: { pairs, userMatches, loading, complete },
    submitMatches,
    getScore,
    reset,
  } = useCharacterMovieMatchGame();
  const [localMatches, setLocalMatches] = useState({});

  React.useEffect(() => {
    reset();
    setLocalMatches({});
  }, []);

  if (loading)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>Loading challenges...</div>
    );
  if (!pairs.length)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>No pairs found.</div>
    );

  function handleSelect(char, ev) {
    setLocalMatches({
      ...localMatches,
      [char]: ev.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitMatches(localMatches);
  }

  return (
    <div>
      <button className="btn" onClick={onBack}>
        &larr; Back
      </button>
      <h2 style={{ color: "#e302dc", fontWeight: 700 }}>Character-Movie Match</h2>
      {!complete ? (
        <form onSubmit={handleSubmit}>
          {pairs.map(p => (
            <div
              key={p.character}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 18,
                gap: 11,
              }}
            >
              <span style={{
                color: "#d4fe01",
                background: "#191613", padding: "6px 14px",
                borderRadius: 10,
                fontWeight: 600,
                fontSize: "1.13em"
              }}>
                {p.character}
              </span>
              <span style={{ margin: 0, color: "#aaa", fontWeight: 400 }}>in</span>
              <select
                onChange={ev => handleSelect(p.character, ev)}
                value={localMatches[p.character] || ""}
                style={{
                  fontSize: "1.04em",
                  borderRadius: 8,
                  border: "2px solid #e302dc",
                  background: "#191613",
                  color: "#e302dc",
                  minWidth: 110,
                  padding: "6px 11px"
                }}
                required
              >
                <option value="">Select Movie</option>
                {pairs.map(opt =>
                  <option value={opt.movie} key={opt.movie}>
                    {opt.movie}
                  </option>
                )}
              </select>
            </div>
          ))}
          <button type="submit" className="btn btn-large" style={{ background: "#d4fe01", color: "#181616" }}>Submit</button>
        </form>
      ) : (
        <div className="kolly-result-card" style={{ marginTop: 18 }}>
          <div style={{ fontSize: 18, color: "#e302dc", fontWeight: 700 }}>Game Complete!</div>
          <div style={{ fontSize: 16, color: "#d4fe01" }}>
            Score: {getScore()} / {pairs.length}
          </div>
          <button className="btn" style={{ marginTop: 16 }} onClick={onFinish}>
            See Results
          </button>
        </div>
      )}
    </div>
  );
}
