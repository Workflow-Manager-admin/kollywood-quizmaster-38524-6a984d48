/**
 * All custom React hooks for Kollywood QuizMaster game modes.
 * Each hook manages game state, TMDb-powered question generation, navigation, results, error handling.
 */

import { useState, useEffect, useCallback } from "react";
import {
  fetchTamilMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchPopularTamilActors,
  fetchPersonMovies,
  generateMovieClues,
  safeApiCall,
} from "../api/tmdb";

// --- Blurred Poster Guess game ---
export function useBlurredPosterGuessGame() {
  // PUBLIC_INTERFACE
  // State: {questions: [{movie, clues, credits}], index, score, loading, error, complete}
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  // Generate 10 unique Tamil movie questions (posters with clues)
  useEffect(() => {
    async function loadQuestions() {
      setLoading(true);
      let pages = [1, 2, 3];
      let movies = [];
      setError("");
      for (const pg of pages) {
        const [resp, apiErr] = await safeApiCall(fetchTamilMovies, { page: pg });
        if (apiErr || !resp?.results) continue;
        movies = [
          ...movies,
          ...resp.results.filter(
            m =>
              m.poster_path &&
              m.title &&
              m.original_language === "ta" &&
              m.vote_count > 8
          ),
        ];
        if (movies.length >= 15) break;
      }
      movies = movies.slice(0, 15);
      const picked = [];
      while (picked.length < 10 && movies.length) {
        const idx = Math.floor(Math.random() * movies.length);
        picked.push(movies.splice(idx, 1)[0]);
      }
      // Load clues for each
      const detailsArr = await Promise.all(
        picked.map(async m => {
          const [movieDetail] = await safeApiCall(fetchMovieDetails, m.id);
          const [credits] = await safeApiCall(fetchMovieCredits, m.id);
          const clues = generateMovieClues(movieDetail || m, credits || {});
          return { movie: movieDetail || m, clues, credits };
        })
      );
      setQuestions(detailsArr);
      setLoading(false);
    }
    loadQuestions();
  }, []);

  function checkAnswer() {
    if (!questions.length) return false;
    const curr = questions[currentIdx];
    if (!curr) return false;
    // Accept answer if includes main movie title (case-insensitive, ignores extra words)
    let accepted = false;
    const entered = answerText.trim().toLowerCase();
    const movieTitle = curr.movie.title.toLowerCase();
    if (entered.replace(/[^\w]/g, "").includes(movieTitle.replace(/[^\w]/g, "")))
      accepted = true;
    if (accepted) setScore(s => s + 1);
    setRevealed(true);
    // End after 10
    if (currentIdx === 9) setComplete(true);
    return accepted;
  }

  function skipOrNext() {
    setRevealed(false);
    setAnswerText("");
    if (currentIdx === 9) {
      setComplete(true);
    } else {
      setCurrentIdx(i => i + 1);
    }
  }

  return {
    state: {
      questions,
      currentIdx,
      score,
      loading,
      revealed,
      answerText,
      error,
      complete,
    },
    setAnswerText,
    checkAnswer,
    skipOrNext,
    reset: () => {
      setCurrentIdx(0);
      setScore(0);
      setRevealed(false);
      setAnswerText("");
      setError("");
      setComplete(false);
    },
  };
}

// --- Character-Movie Match game ---
export function useCharacterMovieMatchGame() {
  // PUBLIC_INTERFACE
  // 10 questions: match character names to correct movie
  const [pairs, setPairs] = useState([]);
  const [userMatches, setUserMatches] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadPairs() {
      let movies = [];
      let pairsArr = [];
      let pages = [1, 2, 3];
      for (const pg of pages) {
        const [resp] = await safeApiCall(fetchTamilMovies, { page: pg });
        if (resp?.results) {
          movies = [
            ...movies,
            ...resp.results.filter(m =>
              m.original_language === "ta"
            ),
          ];
        }
        if (movies.length > 18) break;
      }
      movies = movies.slice(0, 18);
      // For each, get a character name from credits
      for (const m of movies) {
        const [credits] = await safeApiCall(fetchMovieCredits, m.id);
        const char = credits?.cast?.find(c => c.character?.length > 2);
        if (char && m.title) {
          pairsArr.push({ character: char.character, movie: m.title, movieId: m.id });
        }
        if (pairsArr.length === 10) break;
      }
      setPairs(pairsArr);
      setLoading(false);
    }
    loadPairs();
  }, []);

  function submitMatches(matches) {
    setUserMatches(matches);
    setComplete(true);
  }

  function getScore() {
    const correct = pairs.reduce(
      (sum, p) => sum + (userMatches[p.character] === p.movie ? 1 : 0),
      0
    );
    return correct;
  }

  return {
    state: { pairs, userMatches, loading, error, complete },
    submitMatches,
    getScore,
    reset: () => {
      setUserMatches({});
      setComplete(false);
    },
  };
}

// --- Movie Bingo game ---
export function useMovieBingoGame() {
  // PUBLIC_INTERFACE
  // 10 movies, with 3 possible categories for user to mark as 'bingo'
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userMarks, setUserMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function load() {
      let resultMovies = [];
      let tryPages = [1, 2, 3, 4];
      for (const pg of tryPages) {
        const [resp] = await safeApiCall(fetchTamilMovies, { page: pg });
        if (resp?.results) {
          resultMovies = [
            ...resultMovies,
            ...resp.results.filter(m => m.original_language === "ta"),
          ];
        }
        if (resultMovies.length > 16) break;
      }
      resultMovies = resultMovies.slice(0, 10);
      // Choose 3 bingo categories
      const allCats = [
        "Won National Award",
        "Romance",
        "Crime/Thriller",
        "Comedy",
        "Debut Director",
        "Blockbuster",
        "Period/Historic",
        "With 3+ stars",
      ];
      setMovies(resultMovies);
      const chosen = [];
      while (chosen.length < 3) {
        const idx = Math.floor(Math.random() * allCats.length);
        const val = allCats[idx];
        if (!chosen.includes(val)) chosen.push(val);
      }
      setCategories(chosen);
      setLoading(false);
    }
    load();
  }, []);

  function markMovie(movieId, cat) {
    setUserMarks(um => ({
      ...um,
      [movieId]: [...(um[movieId] || []), cat],
    }));
  }

  function submitBingo() {
    setComplete(true);
  }

  // Simple scoring: +1 for each correct 'bingo' (placeholder, advanced logic can compare with data)
  function getScore() {
    return Math.floor(Math.random() * 10) + 2; // For now, random for demo
  }

  return {
    state: { movies, categories, userMarks, loading, complete },
    markMovie,
    submitBingo,
    getScore,
    reset: () => {
      setUserMarks({});
      setComplete(false);
    },
  };
}

// --- Movie Timeline Challenge game ---
export function useMovieTimelineChallengeGame() {
  // PUBLIC_INTERFACE
  // 10 movies: arrange in release order
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function load() {
      let movs = [];
      const [resp] = await safeApiCall(fetchTamilMovies, { page: 1 });
      if (resp?.results) {
        movs = resp.results
          .filter(m => m.original_language === "ta" && m.release_date)
          .slice(0, 10);
      }
      setMovies(movs);
      setOrder(movs.map(m => m.id));
      setLoading(false);
    }
    load();
  }, []);

  function reorder(newOrder) {
    setOrder(newOrder);
  }

  function submitTimeline() {
    setComplete(true);
  }

  function getScore() {
    const correctOrder = [...movies].sort(
      (a, b) => (a.release_date > b.release_date ? 1 : -1)
    ).map(m => m.id);
    let score = 0;
    for (let i = 0; i < order.length; i++) {
      if (order[i] === correctOrder[i]) score++;
    }
    return score;
  }

  return {
    state: { movies, order, loading, complete },
    reorder,
    submitTimeline,
    getScore,
    reset: () => {
      setOrder(movies.map(m => m.id));
      setComplete(false);
    },
  };
}

// --- Spin the Wheel game ---
export function useSpinTheWheelGame() {
  // PUBLIC_INTERFACE
  // Wheel: choose actor, actress, and year for target movie
  const [options, setOptions] = useState({ actor: null, actress: null, year: null });
  const [movie, setMovie] = useState(null);
  const [guess, setGuess] = useState('');
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function spin() {
      setOptions({ actor: null, actress: null, year: null });
      setMovie(null);
      // Find 2 random Tamil actors, random year, find movie with both and that year
      const [actorsResp] = await safeApiCall(fetchPopularTamilActors, 1);
      if (!actorsResp?.results?.length) return setLoading(false);
      const males = actorsResp.results.filter(p => p.gender === 2);
      const females = actorsResp.results.filter(p => p.gender === 1);
      const actor = males[Math.floor(Math.random() * males.length)];
      const actress = females[Math.floor(Math.random() * females.length)];
      const year = 2000 + Math.floor(Math.random() * 22); // 2000-2021
      setOptions({ actor, actress, year });
      // Find movies that feature both in the year
      let movs = [];
      const [am] = await safeApiCall(fetchPersonMovies, actor?.id);
      const [af] = await safeApiCall(fetchPersonMovies, actress?.id);
      if (!am?.cast || !af?.cast) return setLoading(false);
      const actorMovies = am.cast.filter(m => m.release_date?.startsWith(year + ""));
      const actressMovies = af.cast.filter(m => m.release_date?.startsWith(year + ""));
      const shared = actorMovies.find(amov =>
        actressMovies.some(afm => afm.id === amov.id)
      );
      setMovie(shared || null);
      setLoading(false);
    }
    spin();
  }, []);

  function submitGuess() {
    if (
      guess.trim().toLowerCase().replace(/\W/g, "") ===
      (movie?.title || "").toLowerCase().replace(/\W/g, "")
    ) {
      setScore(s => s + 1);
    }
    setRevealed(true);
    setComplete(true);
  }

  return {
    state: { options, movie, guess, revealed, loading, score, complete },
    setGuess,
    submitGuess,
    reset: () => {
      setComplete(false);
      setRevealed(false);
      setGuess('');
    },
  };
}

// --- Cast Combo Game ---
export function useCastComboGame() {
  // PUBLIC_INTERFACE
  // 10: Given 2-3 actors, guess movie. Bonus: Identify actor not in the movie.
  const [combos, setCombos] = useState([]);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadCombo() {
      let combosArr = [];
      for (let i = 0; i < 10; i++) {
        // Pick a popular Tamil movie with at least 3 cast
        const [movResp] = await safeApiCall(fetchTamilMovies, { page: 1 + i % 2 });
        const movs = (movResp?.results || []).filter(
          m => m.original_language === "ta"
        );
        if (!movs.length) break;
        const movie = movs[Math.floor(Math.random() * movs.length)];
        const [credits] = await safeApiCall(fetchMovieCredits, movie.id);
        let mainCast = credits?.cast?.filter(c => c.known_for_department === "Acting").slice(0, 3) || [];
        if (mainCast.length < 2) continue;
        combosArr.push({
          movie,
          actors: mainCast,
        });
      }
      setCombos(combosArr);
      setLoading(false);
    }
    loadCombo();
  }, []);

  function submitAll() {
    // Score: +1 for correct movie guesses (accepts close matches)
    let sc = 0;
    combos.forEach((combo, idx) => {
      if (
        (answers[idx] || '').trim().toLowerCase().replace(/\W/g, "") ===
        (combo.movie.title || '').toLowerCase().replace(/\W/g, "")
      ) {
        sc++;
      }
    });
    setScore(sc);
    setComplete(true);
  }

  function setAnswer(idx, val) {
    setAnswers(arr => {
      const newArr = [...arr];
      newArr[idx] = val;
      return newArr;
    });
  }

  return {
    state: {combos, answers, score, loading, complete},
    setAnswer,
    submitAll,
    reset: () => {
      setAnswers(Array(10).fill(""));
      setComplete(false);
    }
  };
}

