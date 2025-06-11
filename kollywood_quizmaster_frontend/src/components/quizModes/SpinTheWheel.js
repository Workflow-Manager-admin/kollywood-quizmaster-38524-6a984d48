import React from "react";
import { useSpinTheWheelGame } from "../../hooks/useQuizGameModes";

// PUBLIC_INTERFACE
export default function SpinTheWheel({ onBack, onFinish }) {
  const {
    state: { options, movie, guess, revealed, loading, score, complete },
    setGuess,
    submitGuess,
    reset,
  } = useSpinTheWheelGame();

  React.useEffect(() => reset(), []);

  if (loading)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>
        Spinning the Kollywood Wheel...
      </div>
    );

  return (
    <div>
      <button className="btn" onClick={onBack}>
        &larr; Back
      </button>
      <h2 style={{ color: "#e302dc", fontWeight: 700 }}>Spin the Wheel</h2>
      {!options.actor || !options.actress || !options.year ? (
        <div style={{ margin: 35, color: "#d4fe01" }}>Could not spin valid actors/years. Try again later!</div>
      ) : (
        <div style={{
          margin: "22px 0 18px 0",
          background: "#191613",
          borderRadius: 11,
          padding: 20,
        }}>
          <div style={{ color: "#d4fe01", fontWeight: 600, fontSize: "1.1em", marginBottom: 12 }}>
            Your spin: 
            <span style={{ color: "#e302dc", marginLeft: 9 }}>
              {options.actor.name}
            </span> &amp; {" "}
            <span style={{ color: "#e302dc" }}>{options.actress.name}</span> in <span style={{ color: "#fff" }}>{options.year}</span>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!revealed) submitGuess();
            }}
          >
            <input
              className="kolly-blur-input"
              style={{
                padding: "10px 14px",
                fontSize: "1.1rem",
                borderRadius: 9,
                border: "2px solid #e302dc",
                width: "95%",
                maxWidth: 220,
                outline: "none",
                background: "#111",
                color: "#d4fe01",
                fontWeight: 600,
                boxShadow: "0 0 7px #e302dc44",
              }}
              type="text"
              autoFocus
              disabled={revealed}
              value={guess}
              onChange={e => setGuess(e.target.value)}
              placeholder="Guess the movie..."
            />
            <div>
              {!revealed &&
                <button type="submit" className="btn btn-large" style={{ background: "#d4fe01", color: "#181616", marginTop: 10 }}>
                  Check Answer
                </button>
              }
            </div>
          </form>
          {/* Feedback */}
          {revealed && (
            <div style={{
              color: "#fff",
              background: "#0e0c0c",
              border: "2.5px solid #d4fe01",
              borderRadius: 8,
              fontWeight: 600,
              padding: 11,
              margin: "15px 0"
            }}>
              Answer: <span style={{ color: "#d4fe01" }}>{movie?.title}</span>
              <br />
              {guess.trim().toLowerCase().replace(/\W/g, "") ===
                (movie?.title || "").toLowerCase().replace(/\W/g, "")
                ? <span style={{ color: "#49ff2e" }}>✔️ Correct!</span>
                : <span style={{ color: "#ff5353" }}>❌ Not correct</span>}
              {complete && (
                <div>
                  <button className="btn" style={{ marginTop: 12, background: "#e302dc", color: "#fff" }} onClick={onFinish}>
                    See Results
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
