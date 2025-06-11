import React from "react";
import { useBlurredPosterGuessGame } from "../../hooks/useQuizGameModes";
import { getPosterUrl } from "../../api/tmdb";

// PUBLIC_INTERFACE
export default function BlurredPosterGuess({ onBack, onFinish }) {
  const {
    state: { questions, currentIdx, score, loading, revealed, answerText, complete },
    setAnswerText,
    checkAnswer,
    skipOrNext,
    reset,
  } = useBlurredPosterGuessGame();

  React.useEffect(() => reset(), []);

  if (loading)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 60 }}>
        Loading blurred posters and clues...
      </div>
    );

  if (!questions.length)
    return (
      <div style={{ color: "#e302dc", textAlign: "center", marginTop: 80 }}>
        No questions to display. Please try again!
      </div>
    );

  const question = questions[currentIdx];
  const blurStyle = {
    filter: revealed ? "blur(0px)" : "blur(12px)",
    borderRadius: 16,
    width: 280,
    height: 400,
    objectFit: "cover",
    margin: "20px auto 10px",
    background: "#666",
    boxShadow: revealed
      ? "0 0 24px 0 #d4fe0133, 0 4px 24px #e302dc44"
      : "0 0 8px #e302dc44",
    transition: "filter .32s",
    border: "6px solid #d4fe01"
  };
  const clues = question.clues.slice(0, 2);

  return (
    <>
      <div style={{ margin: "0 0 20px 0" }}>
        <button className="btn" onClick={onBack}>
          &larr; Back
        </button>
        <span style={{
          marginLeft: 18,
          color: "#e302dc", fontWeight: 700,
          fontSize: "1.07rem"
        }}>
          Blurred Poster Guess ({currentIdx + 1} / 10)
        </span>
      </div>
      <div style={{ maxWidth: 360, margin: "0 auto", textAlign: "center" }}>
        <img
          src={getPosterUrl(question.movie.poster_path, "w500")}
          alt="Blurred poster"
          style={blurStyle}
          loading="lazy"
        />
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          {clues.map((clue, i) => (
            <div key={i}
              style={{
                background: "rgba(14,12,12,0.8)",
                color: "#d4fe01",
                margin: "8px 0",
                padding: "7px 12px",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: "1rem",
                boxShadow: "0 1px 6px #e302dc44"
              }}>
              <span role="img" aria-label="clue" style={{marginRight:7}}>💡</span>
              {clue}
            </div>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!revealed) checkAnswer();
          }}
          style={{ margin: "18px 0" }}
        >
          <input
            type="text"
            className="kolly-blur-input"
            style={{
              padding: "12px 15px",
              fontSize: "1.1rem",
              borderRadius: 9,
              border: "2px solid #e302dc",
              width: "90%",
              maxWidth: 250,
              outline: "none",
              background: "#111",
              color: "#d4fe01",
              fontWeight: 600,
              boxShadow: "0 0 7px #e302dc33",
              marginBottom: 7
            }}
            value={answerText}
            onChange={e => setAnswerText(e.target.value)}
            disabled={revealed}
            placeholder="Type your guess!"
            autoFocus
            autoComplete="off"
          />
          <div>
            {!revealed ? (
              <button
                type="submit"
                className="btn"
                style={{ marginRight: 10, background: "#d4fe01", color: "#181616" }}
              >
                Check Answer
              </button>
            ) : null}
            <button
              type="button"
              className="btn"
              style={{ background: "#e302dc", color: "#fff" }}
              onClick={skipOrNext}
            >
              {currentIdx === 9 ? "Finish" : revealed ? "Next" : "Skip"}
            </button>
          </div>
        </form>
        {/* Result feedback */}
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
            Answer: <span style={{ color: "#d4fe01" }}>{question.movie.title}</span>
            <br />
            {answerText.trim().toLowerCase().replace(/\W/g, "") ===
            (question.movie.title || "").toLowerCase().replace(/\W/g, "")
              ? <span style={{ color: "#49ff2e" }}>✔️ Correct!</span>
              : <span style={{ color: "#ff5353" }}>❌ Not correct</span>}
          </div>
        )}
        {complete && (
          <div className="kolly-result-card" style={{ marginTop: 28 }}>
            <div style={{ fontSize: 19, color: "#e302dc", fontWeight: 700 }}>
              Game Complete!
            </div>
            <div style={{ fontSize: 16, color: "#d4fe01" }}>
              Score: {score} / 10
              <br />
              <button
                className="btn"
                style={{ marginTop: 13 }}
                onClick={onFinish}
              >
                See Results
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
