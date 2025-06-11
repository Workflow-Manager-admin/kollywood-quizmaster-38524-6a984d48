import React, { useState } from "react";

/**
 * Main container for Kollywood QuizMaster App.
 * Sections: User Login, Dashboard (mode selection),
 * and one section for each quiz/game mode,
 * plus Clues/Hints and Result display.
 *
 * All game modes are represented by placeholder child components,
 * clearly structured for follow-on development.
 */

/*
PUBLIC_INTERFACE
KollywoodQuizMasterContainer - Themed Kollywood app container with vibrant colors & movie-style accents.
*/
function KollywoodQuizMasterContainer() {
  // State tracking login and selected quiz mode
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // List of quiz modes: one entry per game/feature (order is dashboard display order)
  const quizModes = [
    {
      key: "blurred-poster",
      label: "Blurred Poster Guess",
      description: "Guess the Kollywood movie from a blurred poster using clues. Option to skip or reveal answer.",
      icon: "🎥",
    },
    {
      key: "character-movie-match",
      label: "Character-Movie Match",
      description: "Drag and drop character names into the correct Kollywood movies.",
      icon: "🎭",
    },
    {
      key: "movie-bingo",
      label: "Movie Bingo",
      description: "Click on movies matching given categories, such as awards or genres.",
      icon: "🎲",
    },
    {
      key: "timeline-challenge",
      label: "Movie Timeline Challenge",
      description: "Arrange Kollywood movies in the correct chronological order of release.",
      icon: "⏳",
    },
    {
      key: "spin-wheel",
      label: "Spin the Wheel",
      description: "Spin for an actor, actress, and year, then guess the movie featuring all three.",
      icon: "🎡",
    },
    {
      key: "cast-combo",
      label: "Cast Combo",
      description: "Guess the movie with 2–3 given actors; bonus: reverse mode to guess the actor not in a movie.",
      icon: "👥",
    },
  ];

  // ---- Placeholder CHILD COMPONENTS ----

  // PUBLIC_INTERFACE
  // User Login (placeholder) - update with real auth in the future
  function UserLoginSection({ onLogin }) {
    return (
      <div
        style={{
          maxWidth: 420,
          margin: "120px auto 0",
          background: "rgba(14,12,12,0.94)",
          borderRadius: "18px",
          boxShadow: "0 7px 36px 0 #e302dc44, 0 0 0 9px #d4fe0117",
          padding: "44px 34px",
          color: "#fff",
          position: "relative",
        }}
        className="kolly-backdrop"
      >
        <div
          className="kolly-movie-strip"
          style={{
            border: "3.5px solid #d4fe01",
            filter: "drop-shadow(0 0 8px #e302dc99)",
          }}
        />
        <h2
          className="kolly-section-header"
          style={{
            fontSize: "2.12rem",
            marginBottom: 18,
            textShadow: "0 1px 9px #d4fe0142, 0 0 5px #e302dc88",
          }}
        >
          Welcome to Kollywood QuizMaster
        </h2>
        <div className="kolly-movie-dots" aria-hidden>
          <span className="kolly-dot" />
          <span className="kolly-dot" />
          <span className="kolly-dot" />
          <span className="kolly-dot" />
        </div>
        <div style={{ marginBottom: 22, textAlign: "center" }}>
          <span className="kolly-highlight">
            Login to Play
          </span>
        </div>
        <button
          className="btn btn-large"
          style={{ width: "100%" }}
          onClick={onLogin}
        >
          Log in with Google
        </button>
        <div
          style={{
            fontSize: 13.7,
            color: "#e0e0e0",
            opacity: 0.7,
            marginTop: 18,
            textAlign: "center",
          }}
        >
          No real authentication needed. Click to continue.
        </div>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function ModeDashboard({ onSelectMode }) {
    return (
      <div className="kolly-container kolly-fullwidth">
        <div className="container" style={{ paddingBottom: "32px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                height: "14px",
                width: "190px",
                background: "var(--kolly-film-border)",
                borderRadius: "11px",
                margin: "0 auto 11px auto",
                boxShadow: "0 1px 8px #e302dc66"
              }}
            />
            <h1 className="kolly-section-header" style={{marginBottom: "10px"}}>
              <span className="kolly-accent-underline">Kollywood QuizMaster</span>{" "}
              <span role="img" aria-label="clapperboard">🎬</span>
            </h1>
            <div
              style={{
                color: "#d4fe01",
                fontSize: "1.14rem",
                fontWeight: 500,
                marginBottom: 10,
                textShadow: "0 0 6px #d4fe01"
              }}
            >
              Choose your Kollywood quiz adventure!
            </div>
            <div style={{ color: "#eee", opacity: 0.77, fontSize: 16 }}>
              Each mode offers 10 movie challenges, clues, movie vibes & results!
            </div>
            <div className="kolly-movie-dots" aria-hidden={true}>
              <span className="kolly-dot" />
              <span className="kolly-dot" />
              <span className="kolly-dot" />
              <span className="kolly-dot" />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: 36,
            }}
          >
            {quizModes.map((mode, idx) => (
              <section
                key={mode.key}
                className="kolly-mode-card"
                style={{
                  borderColor:
                    mode.key === "blurred-poster"
                      ? "#e302dc"
                      : idx % 2 === 0
                      ? "#e302dc"
                      : "#d4fe01",
                  boxShadow:
                    idx % 2 === 0
                      ? "0 0 20px 0 #e302dc33"
                      : "0 0 20px 0 #d4fe0122",
                }}
              >
                <span className="kolly-movie-icon" aria-label="movie-icon">
                  {mode.icon}
                </span>
                <div className="kolly-mode-title">{mode.label}</div>
                <div className="kolly-mode-desc">{mode.description}</div>
                <button
                  className="btn btn-large"
                  onClick={() => onSelectMode(mode.key)}
                  style={{
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: -14,
                      top: -9,
                      color: "#e302dc",
                      fontSize: "1.41em",
                      pointerEvents: "none",
                      filter: "drop-shadow(0 1px 6px #e302dc88)"
                    }}
                    aria-hidden
                  >
                    ✨
                  </span>
                  Play {mode.label}
                </button>
                <div
                  style={{
                    position: 'absolute',
                    left: 9,
                    bottom: 15,
                    width: 30,
                    height: 7,
                    borderRadius: 5,
                    background: idx % 2 === 0 ? "#e302dc" : "#d4fe01",
                    opacity: 0.23,
                  }}
                />
              </section>
            ))}
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "48px",
              color: "#d4fe01",
              letterSpacing: 0.4,
              fontSize: 18,
              fontWeight:'600',
              textShadow: "0 0 4px #d4fe01bb",
            }}
          >
            <span className="kolly-movie-strip" style={{margin: '0 auto 13px auto'}} />
            <br />
            <em>
              Powered by star power,{" "}
              <span style={{ color: "#e302dc", fontWeight: 700 }}>movies</span>, and{" "}
              <span style={{ color: "#d4fe01", fontWeight: 700 }}>vibrant Kollywood fun!</span>
            </em>
          </div>
        </div>
      </div>
    );
  }

  // Simple, themed progress bar placeholder (non-functional, ready for integration)
  // PUBLIC_INTERFACE
  function ProgressBarPlaceholder() {
    return (
      <div style={{
        width: '100%',
        height: 18,
        margin: "10px 0 26px 0",
        borderRadius: 9,
        background: 'var(--kolly-film-border)',
        boxShadow: "0 1px 6px #d4fe01aa, 0 0 5px #e302dc44",
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          borderRadius: 9,
          width: "25%", // placeholder value for visual; real value can be dynamically set
          background: "linear-gradient(90deg, #e302dc 55%, #d4fe01 100%)",
          boxShadow: "0 0 10px 1px #e302dc55",
          transition: "width 0.3s"
        }} />
        <span style={{
          position: "absolute",
          left: "50%",
          top: "46%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontWeight: 700,
          textShadow: "0 0 3px #e302dc99",
          fontSize: 13,
          letterSpacing: 0.5,
          opacity: 0.87
        }}>
          Progress: 2 / 10
        </span>
      </div>
    );
  }

  // Section placeholders for each quiz mode with standardized progress bar and results position
  // PUBLIC_INTERFACE
  function BlurredPosterGuessSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Blurred Poster Guess" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Blurred Poster Guess" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function CharacterMovieMatchSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Character-Movie Match" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Character-Movie Match" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function MovieBingoSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Movie Bingo" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Movie Bingo" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function MovieTimelineChallengeSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Movie Timeline Challenge" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Movie Timeline Challenge" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function SpinTheWheelSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Spin the Wheel" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Spin the Wheel" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function CastComboSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Cast Combo" onBack={onBack}>
        <ProgressBarPlaceholder />
        <QuizPlaceholder label="Cast Combo" />
        <CluesAndHintsSection />
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  // Displays clue/hint section (universal for all quizzes)
  function CluesAndHintsSection() {
    return (
      <div
        style={{
          margin: "32px 0 16px",
          background: "rgba(212,254,1,0.13)",
          border: "2px dotted #d4fe01",
          borderRadius: 10,
          color: "#d4fe01",
          fontWeight: 500,
          textAlign: "center",
          padding: 16,
        }}
      >
        <span>Clues &amp; Hints area (will be populated per question)</span>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  // Result section inside each mode; can show global results or per-round, controlled via prop
  function SectionResult({ onShowResults }) {
    return (
      <div style={{ marginTop: 32, textAlign: "center" }}>
        {/* To be replaced with question result/progress controls */}
        <button className="btn" style={{ marginTop: 0 }} onClick={onShowResults}>
          See Results
        </button>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  // End-of-quiz results section (global for all modes)
  function ResultDisplay({ onDashboard }) {
    return (
      <div
        style={{
          margin: "120px auto 0",
          maxWidth: 520,
          background: "rgba(225,254,1,0.12)",
          border: "2.5px solid #d4fe01",
          borderRadius: 14,
          padding: 40,
          color: "#a6bd00",
          textAlign: "center",
          position: "relative"
        }}
      >
        <h2 style={{
          color: "#e302dc",
          marginBottom: 16,
          textShadow: "0 0 9px #e302dc44"
        }}>Quiz Results</h2>
        <p style={{ color: "#d4fe01", marginBottom: 24 }}>
          Your summary, score and correct answers will be shown here.
        </p>
        <button className="btn btn-large" onClick={onDashboard}>
          Return to Dashboard
        </button>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-17px",
            height: "14px",
            width: "180px",
            background: "repeating-linear-gradient(90deg, #d4fe01 0 12px, #e302dc 12px 19px, #0e0c0c 19px 26px)",
            borderRadius: "9px",
            boxShadow: "0 1px 8px #e302dc55"
          }}
        />
      </div>
    );
  }

  // PUBLIC_INTERFACE
  // Simple, styled section header container with back button
  function SectionContainer({ title, onBack, children }) {
    return (
      <div className="container" style={{ paddingTop: "120px", paddingBottom: 40 }}>
        <button
          className="btn"
          style={{
            background: "#e302dc",
            color: "#fff",
            marginRight: 8,
            marginBottom: 18,
          }}
          onClick={onBack}
        >
          &larr; Back to Dashboard
        </button>
        <h2
          style={{
            color: "#e302dc",
            marginBottom: 15,
            borderBottom: "3.5px dashed #d4fe01",
            paddingBottom: "7px",
            fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
            letterSpacing: "0.04em",
            textShadow: "0 0 9px #e302dc44"
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    );
  }

  // PUBLIC_INTERFACE
  // Generic placeholder for not-yet-implemented Quiz modes
  function QuizPlaceholder({ label }) {
    return (
      <div
        style={{
          marginTop: 24,
          background: "rgba(230,2,220,0.04)",
          border: "2px dashed #e302dc",
          padding: 32,
          borderRadius: 12,
          color: "#e302dc",
          textAlign: "center",
        }}
      >
        <p style={{ fontWeight: 500 }}>
          The <span style={{ color: "#d4fe01" }}>{label}</span> interface will be implemented in the next steps.
        </p>
        <p>Placeholder section. Play logic and visuals coming soon.</p>
      </div>
    );
  }

  // ---- Top Level Render Logic ----

  // Login section
  if (!isLoggedIn) {
    return <UserLoginSection onLogin={() => setIsLoggedIn(true)} />;
  }

  // Results display overrides any mode UI
  if (showResults) {
    return <ResultDisplay onDashboard={() => { setShowResults(false); setSelectedMode(null); }} />;
  }

  // Render a quiz mode section if selected
  switch (selectedMode) {
    case "blurred-poster":
      return (
        <BlurredPosterGuessSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    case "character-movie-match":
      return (
        <CharacterMovieMatchSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    case "movie-bingo":
      return (
        <MovieBingoSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    case "timeline-challenge":
      return (
        <MovieTimelineChallengeSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    case "spin-wheel":
      return (
        <SpinTheWheelSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    case "cast-combo":
      return (
        <CastComboSection
          onBack={() => setSelectedMode(null)}
          onShowResults={() => setShowResults(true)}
        />
      );
    default:
      break;
  }

  // Main dashboard: quiz mode selection
  return <ModeDashboard onSelectMode={setSelectedMode} />;
}

export default KollywoodQuizMasterContainer;
