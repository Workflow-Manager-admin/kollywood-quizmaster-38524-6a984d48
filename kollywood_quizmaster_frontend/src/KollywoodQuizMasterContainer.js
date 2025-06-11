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

// PUBLIC_INTERFACE
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
      description:
        "Guess the Kollywood movie from a blurred poster using clues. Option to skip or reveal answer.",
    },
    {
      key: "character-movie-match",
      label: "Character-Movie Match",
      description:
        "Drag and drop character names into the correct Kollywood movies.",
    },
    {
      key: "movie-bingo",
      label: "Movie Bingo",
      description:
        "Click on movies matching given categories, such as awards or genres.",
    },
    {
      key: "timeline-challenge",
      label: "Movie Timeline Challenge",
      description:
        "Arrange Kollywood movies in the correct chronological order of release.",
    },
    {
      key: "spin-wheel",
      label: "Spin the Wheel",
      description:
        "Spin for an actor, actress, and year, then guess the movie featuring all three.",
    },
    {
      key: "cast-combo",
      label: "Cast Combo",
      description:
        "Guess the movie with 2–3 given actors; bonus: reverse mode to guess the actor not in a movie.",
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
          background: "rgba(14,12,12,0.88)",
          borderRadius: "14px",
          boxShadow: "0 4px 24px #e302dc33",
          padding: "40px 32px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            color: "#e302dc",
            textAlign: "center",
            marginBottom: 24,
            letterSpacing: ".02rem",
          }}
        >
          Welcome to Kollywood QuizMaster
        </h2>
        <div style={{ marginBottom: 18, textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "#d4fe01",
              color: "#0e0c0c",
              borderRadius: 12,
              padding: "8px 18px",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
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
            fontSize: 13,
            color: "#eee",
            opacity: 0.7,
            marginTop: 16,
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
      <div className="container" style={{ paddingTop: "120px", paddingBottom: "32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1
            style={{
              fontSize: "2.4rem",
              letterSpacing: 0.5,
              fontWeight: 700,
              color: "#e302dc",
              marginBottom: 8,
            }}
          >
            Kollywood QuizMaster 🎬
          </h1>
          <div
            style={{
              color: "#d4fe01",
              fontSize: "1.14rem",
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            Choose your Kollywood quiz adventure!
          </div>
          <div style={{ color: "#eee", opacity: 0.77, fontSize: 16 }}>
            Each mode offers 10 movie challenges, clues, movie vibes & results!
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: 32,
          }}
        >
          {quizModes.map((mode) => (
            <section
              key={mode.key}
              style={{
                background: "#1A1A1A",
                border: `2.5px solid ${mode.key === "blurred-poster" ? "#e302dc" : "#d4fe01"}`,
                borderRadius: 17,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: `0 4px 18px 0 #00000021`,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "1.2rem",
                  color: "#e302dc",
                  letterSpacing: 0.4,
                  marginBottom: 12,
                }}
              >
                {mode.label}
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  color: "#e4e4e4",
                  textAlign: "center",
                  marginBottom: 18,
                  minHeight: 54,
                  opacity: 0.96,
                }}
              >
                {mode.description}
              </div>
              <button
                className="btn btn-large"
                onClick={() => onSelectMode(mode.key)}
              >
                Play {mode.label}
              </button>
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
          }}
        >
          <em>Powered by star power, movies, and vibrant Kollywood fun!</em>
        </div>
      </div>
    );
  }

  // Section placeholders for each quiz mode
  // PUBLIC_INTERFACE
  function BlurredPosterGuessSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Blurred Poster Guess" onBack={onBack}>
        <div>
          <QuizPlaceholder label="Blurred Poster Guess" />
          <CluesAndHintsSection />
        </div>
        <SectionResult onShowResults={onShowResults} />
      </SectionContainer>
    );
  }

  // PUBLIC_INTERFACE
  function CharacterMovieMatchSection({ onBack, onShowResults }) {
    return (
      <SectionContainer title="Character-Movie Match" onBack={onBack}>
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
        }}
      >
        <h2 style={{ color: "#e302dc", marginBottom: 16 }}>Quiz Results</h2>
        <p style={{ color: "#d4fe01", marginBottom: 24 }}>
          Your summary, score and correct answers will be shown here.
        </p>
        <button className="btn btn-large" onClick={onDashboard}>
          Return to Dashboard
        </button>
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
        <h2 style={{ color: "#e302dc", marginBottom: 15 }}>{title}</h2>
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
