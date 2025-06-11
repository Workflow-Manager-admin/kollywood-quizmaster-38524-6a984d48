import React, { useState } from 'react';

/**
 * Main container for Kollywood QuizMaster app.
 * Displays quiz mode selection and dynamically loads each game section.
 */
 // PUBLIC_INTERFACE
function KollywoodQuizMasterContainer() {
  // State for login/auth and selected game mode
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);

  // List of available quiz modes
  const quizModes = [
    {
      key: 'blurred-poster',
      label: 'Blurred Poster Guess',
      description:
        "Guess the Kollywood movie from a blurred poster using clues. Option to skip or reveal answer."
    },
    {
      key: 'character-movie-match',
      label: 'Character-Movie Match',
      description:
        "Drag and drop character names into the correct Kollywood movies."
    },
    {
      key: 'movie-bingo',
      label: 'Movie Bingo',
      description:
        "Click on movies matching given categories, such as awards or genres."
    },
    {
      key: 'timeline-challenge',
      label: 'Movie Timeline Challenge',
      description:
        "Arrange Kollywood movies in the correct chronological order of release."
    },
    {
      key: 'spin-wheel',
      label: 'Spin the Wheel',
      description:
        "Spin for an actor, actress, and year, then guess the movie featuring all three."
    },
    {
      key: 'cast-combo',
      label: 'Cast Combo',
      description:
        "Guess the movie with 2–3 given actors; bonus: reverse mode to guess the actor not in a movie."
    }
  ];

  // PUBLIC_INTERFACE
  function handleLogin() {
    setIsLoggedIn(true);
  }

  // PUBLIC_INTERFACE
  function handleSelectMode(key) {
    setSelectedMode(key);
  }

  // PUBLIC_INTERFACE
  function handleBackToDashboard() {
    setSelectedMode(null);
  }

  // Placeholder child components for each mode; replace with real implementations later
  function QuizModePlaceholder({ modeKey }) {
    let label = quizModes.find(m => m.key === modeKey)?.label || '';
    return (
      <div style={{
        marginTop: 48,
        background: 'rgba(230,2,220,0.05)',
        border: '2px dashed #e302dc',
        padding: 32,
        borderRadius: 12,
        color: '#e302dc',
        textAlign: 'center'
      }}>
        <h2>{label}</h2>
        <p>Quiz interface for "{label}" mode will appear here.</p>
        <button className="btn" onClick={handleBackToDashboard}>Back to Dashboard</button>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function ResultDisplay({ onContinue }) {
    // Placeholder: to be filled with real results and answers
    return (
      <div style={{
        marginTop: 48,
        background: 'rgba(225,254,1,0.12)',
        border: '2px solid #d4fe01',
        padding: 32,
        borderRadius: 12,
        color: '#a6bd00',
        textAlign: 'center'
      }}>
        <h2>Quiz Results</h2>
        <p>Your summary and correct answers will be shown here.</p>
        <button className="btn" onClick={onContinue}>Return to Dashboard</button>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Login Section
    return (
      <div style={{
        maxWidth: 420,
        margin: '120px auto 0',
        background: 'rgba(14,12,12,0.88)',
        borderRadius: '14px',
        boxShadow: '0 4px 24px #e302dc33',
        padding: '40px 32px',
        color: '#fff'
      }}>
        <h2 style={{ color: '#e302dc', textAlign: 'center', marginBottom: 24 }}>Welcome to Kollywood QuizMaster</h2>
        <div style={{ marginBottom: 18, textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#d4fe01',
            color: '#0e0c0c',
            borderRadius: 12,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: '1.1rem'
          }}>
            Login to Play
          </span>
        </div>
        {/* Simple login simulation */}
        <button className="btn btn-large" style={{ width: '100%' }} onClick={handleLogin}>
          Log in with Google
        </button>
        <div style={{ fontSize: 13, color: '#eee', opacity: 0.7, marginTop: 16, textAlign: 'center' }}>
          No real authentication needed. Click to continue.
        </div>
      </div>
    );
  }

  if (selectedMode) {
    // Render quiz mode section placeholder (replace later)
    return <QuizModePlaceholder modeKey={selectedMode} />;
  }

  // Main dashboard after login
  return (
    <div className="container" style={{paddingTop: '120px', paddingBottom: '32px'}}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{
          fontSize: '2.4rem',
          letterSpacing: 0.5,
          fontWeight: 700,
          color: '#e302dc',
          marginBottom: 8,
        }}>Kollywood QuizMaster 🎬</h1>
        <div style={{ color: '#d4fe01', fontSize: '1.14rem', fontWeight: 500, marginBottom: 8 }}>
          Choose your Kollywood quiz adventure!
        </div>
        <div style={{ color: '#eee', opacity: 0.77, fontSize: 16 }}>
          Each mode offers 10 movie challenges, clues, movie vibes & results!
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
        gap: 32,
      }}>
        {quizModes.map(mode => (
          <section key={mode.key} style={{
            background: '#1A1A1A',
            border: `2.5px solid ${mode.key==='blurred-poster'?'#e302dc':'#d4fe01'}`,
            borderRadius: 17,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: `0 4px 18px 0 #00000021`,
          }}>
            <div style={{
              fontWeight: 600,
              fontSize: '1.2rem',
              color: '#e302dc',
              letterSpacing: 0.4,
              marginBottom: 12,
            }}>{mode.label}</div>
            <div style={{
              fontSize: 15.5,
              color: '#e4e4e4',
              textAlign: 'center',
              marginBottom: 18,
              minHeight: 54,
              opacity: 0.96
            }}>{mode.description}</div>
            <button className="btn btn-large"
              onClick={() => handleSelectMode(mode.key)}>
              Play {mode.label}
            </button>
          </section>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '48px', color: '#d4fe01', letterSpacing: 0.4, fontSize: 18 }}>
        <em>Powered by star power, movies, and vibrant Kollywood fun!</em>
      </div>
    </div>
  );
}


export default KollywoodQuizMasterContainer;
