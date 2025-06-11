import React from "react";
import { useCastComboGame } from "../../hooks/useQuizGameModes";

// PUBLIC_INTERFACE
export default function CastCombo({ onBack, onFinish }) {
  const {
    state: { combos, answers, score, loading, complete },
    setAnswer,
    submitAll,
    reset,
  } = useCastComboGame();

  React.useEffect(() => reset(), []);

  if (loading)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>
        Loading cast combo challenges...
      </div>
    );

  if (!combos.length)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>
        No challenges available.
      </div>
    );

  function handleInput(idx, val) {
    setAnswer(idx, val);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    submitAll();
  }

  return (
    <div>
      <button className="btn" onClick={onBack}>
        &larr; Back
      </button>
      <h2 style={{ color: "#e302dc", fontWeight: 700 }}>Cast Combo</h2>
      <form onSubmit={handleSubmit}>
        {combos.map((combo, idx) =>
          <div key={combo.movie.id} style={{
            background: "#191613",
            borderRadius: 12,
            margin: "10px 0",
            padding: "13px 18px"
          }}>
            <div style={{
              fontWeight: 600, color: "#d4fe01",
              marginBottom: 6, fontSize: "1.09em"
            }}>
              Which Kollywood movie starred:
              <span style={{ color: "#e302dc", marginLeft: 7 }}>
                {combo.actors.map(a => a.name).join(", ")}
              </span>
              ?
            </div>
            <input
              style={{
                padding: "8px 13px", borderRadius: 8, border: "2px solid #e302dc",
                background: "#110f0e", color: "#d4fe01", fontWeight: 500,
                fontSize: "1.06em", width: "96%"
              }}
              type="text"
              value={answers[idx] || ""}
              onChange={e => handleInput(idx, e.target.value)}
              placeholder="Enter movie title..."
              required
              disabled={complete}
            />
          </div>
        )}
        {!complete ? (
          <button className="btn btn-large" style={{ background: "#d4fe01", color: "#181616", marginTop: 13 }}>
            Submit All
          </button>
        ) : (
          <div className="kolly-result-card" style={{ marginTop: 18 }}>
            <div style={{ fontSize: 18, color: "#e302dc", fontWeight: 700 }}>
              Game Complete! Your Score: <span style={{ color: "#d4fe01" }}>{score} / {combos.length}</span>
            </div>
            <button className="btn" style={{ marginTop: 14 }} onClick={onFinish}>
              See Results
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
