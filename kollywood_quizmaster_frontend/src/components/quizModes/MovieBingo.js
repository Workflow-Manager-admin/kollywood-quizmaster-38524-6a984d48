import React, { useState } from "react";
import { useMovieBingoGame } from "../../hooks/useQuizGameModes";

// PUBLIC_INTERFACE
export default function MovieBingo({ onBack, onFinish }) {
  const {
    state: { movies, categories, userMarks, loading, complete },
    markMovie,
    submitBingo,
    getScore,
    reset,
  } = useMovieBingoGame();

  const [localMarks, setLocalMarks] = useState({});
  React.useEffect(() => {
    reset();
    setLocalMarks({});
  }, []);

  if (loading)
    return (<div style={{ color: "#e302dc", textAlign: "center", marginTop: 70 }}>Loading Bingo board...</div>);

  if (!movies.length || !categories.length)
    return (<div style={{ color: "#e302dc", textAlign: "center", marginTop: 70 }}>Nothing to show.</div>);

  function handleMark(movieId, cat) {
    setLocalMarks(lm => ({
      ...lm,
      [movieId]: [...(lm[movieId] || []), cat],
    }));
    markMovie(movieId, cat);
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitBingo();
  }

  return (
    <div>
      <button className="btn" onClick={onBack}>
        &larr; Back
      </button>
      <h2 style={{ color: "#e302dc", fontWeight: 700 }}>Movie Bingo</h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 14, margin: "30px 0 18px"
      }}>
        {movies.map(m =>
          <div key={m.id}
            style={{
              background: "#191613",
              color: "#d4fe01",
              border: "2px solid #e302dc77",
              borderRadius: 13,
              padding: 13,
              fontWeight: 600,
            }}>
            <div style={{ fontWeight: 700 }}>{m.title}</div>
            <div style={{ marginTop: 7 }}>
              {categories.map(cat =>
                <button
                  key={cat}
                  className="btn"
                  style={{
                    fontSize: "0.96em",
                    margin: "5px 7px 1px 0",
                    color: "#191613",
                    background: "#d4fe01"
                  }}
                  disabled={Boolean((localMarks[m.id] || []).includes(cat)) || complete}
                  onClick={() => handleMark(m.id, cat)}
                >
                  {cat}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {!complete ? (
        <button className="btn btn-large"
          style={{ background: "#e302dc", color: "#fff" }} onClick={handleSubmit}>
          Submit Bingo!
        </button>
      ) : (
        <div className="kolly-result-card" style={{ marginTop: 14 }}>
          <div style={{ fontSize: 19, color: "#e302dc", fontWeight: 700 }}>
            Bingo Complete! <span role="img" aria-label="clap">🎉</span>
          </div>
          <div style={{ fontSize: 16, color: "#d4fe01" }}>
            Score: {getScore()} / 10
          </div>
          <button className="btn" style={{ marginTop: 13 }} onClick={onFinish}>
            See Results
          </button>
        </div>
      )}
    </div>
  );
}
