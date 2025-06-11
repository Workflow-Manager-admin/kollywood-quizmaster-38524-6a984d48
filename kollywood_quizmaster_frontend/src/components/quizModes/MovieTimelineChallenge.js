import React, { useState } from "react";
import { useMovieTimelineChallengeGame } from "../../hooks/useQuizGameModes";

// PUBLIC_INTERFACE
export default function MovieTimelineChallenge({ onBack, onFinish }) {
  const {
    state: { movies, order, loading, complete },
    reorder,
    submitTimeline,
    getScore,
    reset,
  } = useMovieTimelineChallengeGame();

  React.useEffect(() => {
    reset();
  }, []);

  const [localOrder, setLocalOrder] = useState([]);

  React.useEffect(() => {
    setLocalOrder(order);
  }, [order]);

  if (loading)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 70 }}>
        Loading Kollywood movies...
      </div>
    );

  if (!movies.length)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 70 }}>
        No movies found. Try again!
      </div>
    );

  function moveUp(idx) {
    if (idx === 0) return;
    let arr = [...localOrder];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    setLocalOrder(arr);
  }
  function moveDown(idx) {
    if (idx === localOrder.length - 1) return;
    let arr = [...localOrder];
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    setLocalOrder(arr);
  }

  function handleSubmit(e) {
    e.preventDefault();
    reorder(localOrder);
    submitTimeline();
  }

  return (
    <div>
      <button className="btn" onClick={onBack}>&larr; Back</button>
      <h2 style={{
        color: "#e302dc", fontWeight: 700
      }}>Movie Timeline Challenge</h2>
      <form onSubmit={handleSubmit}>
        <div style={{
          marginTop: 22, marginBottom: 18,
          background: "rgba(14,12,12,0.9)",
          borderRadius: 15,
          padding: "20px 15px",
        }}>
          {localOrder.map((movieId, idx) => {
            const mov = movies.find(m => m.id === movieId);
            return mov ? (
              <div
                key={mov.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#191613",
                  borderRadius: 8,
                  padding: "7px 14px",
                  marginBottom: 7,
                  color: "#d4fe01",
                  fontWeight: 600
                }}
              >
                <span style={{ minWidth: 34 }}>{idx + 1}.</span>
                <span style={{ flex: 1 }}>{mov.title} <span style={{ color: "#e302dc", fontSize: ".95em", fontWeight:500 }}>({mov.release_date?.substring(0, 4)})</span></span>
                <button type="button" className="btn" style={{ marginRight: 7 }} onClick={() => moveUp(idx)}>
                  ↑
                </button>
                <button type="button" className="btn" onClick={() => moveDown(idx)}>
                  ↓
                </button>
              </div>
            ) : null;
          })}
        </div>
        {!complete ? (
          <button className="btn btn-large" style={{ background: "#d4fe01", color: "#191613", fontWeight:600 }}>
            Submit Order
          </button>
        ) : (
          <div className="kolly-result-card" style={{ marginTop: 17 }}>
            <div style={{ fontSize: 19, color: "#e302dc", fontWeight: 700 }}>
              Challenge Done!
            </div>
            <div style={{ fontSize: 16, color: "#d4fe01" }}>
              Score: {getScore()} / {movies.length}
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
