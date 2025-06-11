import React from 'react';
import './App.css';
import KollywoodQuizMasterContainer from './KollywoodQuizMasterContainer';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" aria-label="movie">&#127909;</span>
              Kollywood QuizMaster
            </div>
            <span
              style={{
                color: '#d4fe01', fontWeight: 500, letterSpacing: '0.1rem', fontSize: '1.06rem'
              }}>
              {/* Tagline or placeholder */}
              Play & Win!
            </span>
          </div>
        </div>
      </nav>
      <main>
        <KollywoodQuizMasterContainer />
      </main>
    </div>
  );
}

export default App;