// TMDb API utility for Kollywood QuizMaster
// Handles fetches for Tamil movies, actors, posters, movie data, cast, clues, with error handling.
// TMDb docs: https://developers.themoviedb.org/3

const API_KEY = '5bc67d3b06aecbd18121a3cbbc16eb59';
const BASE_URL = 'https://api.themoviedb.org/3';

function tmdbFetch(url, params = {}) {
  // PUBLIC_INTERFACE
  // Universal wrapper for TMDb calls with error/response normalization.
  const allParams = { ...params, api_key: API_KEY, language: 'en-US' };
  const qs = Object.entries(allParams)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  return fetch(`${BASE_URL}${url}?${qs}`)
    .then(async (res) => {
      if (!res.ok) {
        let msg = res.statusText;
        try {
          const dat = await res.json();
          msg = dat.status_message || msg;
        } catch {}
        throw new Error(`TMDb API Error: ${msg}`);
      }
      return res.json();
    });
}

/**
 * List "Kollywood" movies using 'with_original_language=ta' (Tamil)
 * and popularity/revenue sorting, paged for variety in quizzes.
 * @param {object} opts - { page?: number, year?: number, query?:string }
 */
export function fetchTamilMovies(opts = {}) {
  // PUBLIC_INTERFACE
  return tmdbFetch('/discover/movie', {
    with_original_language: 'ta',
    sort_by: 'popularity.desc',
    page: opts.page || 1,
    ...(opts.year ? { 'primary_release_year': opts.year } : {}),
    ...(opts.query ? { query: opts.query } : {}),
    include_adult: false
  });
}

/**
 * Search for a Tamil movie by title.
 * @param {string} query 
 * @returns Promise<Movie[]>
 */
export function searchTamilMovies(query) {
  // PUBLIC_INTERFACE
  return tmdbFetch('/search/movie', {
    query,
    language: 'en-US'
  });
}

/**
 * Fetch movie details by TMDb movie id
 * @param {number|string} movieId 
 * @returns Promise<Movie>
 */
export function fetchMovieDetails(movieId) {
  // PUBLIC_INTERFACE
  return tmdbFetch(`/movie/${movieId}`, {
    append_to_response: 'credits,images'
  });
}

/**
 * Fetch credits/cast for a specific movie
 * @param {number|string} movieId 
 * @returns Promise<{cast:[], crew:[]}>
 */
export function fetchMovieCredits(movieId) {
  // PUBLIC_INTERFACE
  return tmdbFetch(`/movie/${movieId}/credits`);
}

/**
 * Get poster image URL at given size ('w500' etc)
 * @param {string} path 
 * @param {string} size 
 */
export function getPosterUrl(path, size = 'w500') {
  // PUBLIC_INTERFACE
  if (!path) return null;
  // Possible sizes: w92,w154,w185,w342,w500,w780,original
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * List of popular Tamil actors ("Kollywood stars") as fallback.
 * TMDb does not provide language-specific actors API, so we scan movie casts.
 * @param {number} page
 * @returns Promise<{results: Person[]}>
 */
export function fetchPopularTamilActors(page = 1) {
  // PUBLIC_INTERFACE
  // Heuristic: get popular Tamil movies, merge & dedupe their cast.
  return fetchTamilMovies({ page })
    .then(moviesResp => {
      const promises = moviesResp.results.slice(0, 5).map(m =>
        fetchMovieCredits(m.id).catch(() => ({ cast: [] }))
      );
      return Promise.all(promises);
    })
    .then(castLists => {
      // flatten and dedupe by id, sort by popularity
      const allCast = castLists.flatMap(c => c.cast || []);
      const unique = {};
      allCast.forEach(p => { unique[p.id] = p; });
      return {
        results: Object.values(unique)
          .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
          .slice(0, 20)
      };
    });
}

/**
 * Fetch movies for an actor (person_id)
 * @param {number} personId 
 * @returns Promise<{cast:[]}>
 */
export function fetchPersonMovies(personId) {
  // PUBLIC_INTERFACE
  return tmdbFetch(`/person/${personId}/movie_credits`);
}

/**
 * Fetch clues for a movie: genres, release date, director (crew), tagline etc.
 * @param {object} movie 
 * @param {object} credits 
 * @returns {string[]}
 */
export function generateMovieClues(movie, credits) {
  // PUBLIC_INTERFACE
  // Genres, year, one actor, director, tagline, language, popularity
  const clues = [];
  if (movie.release_date) clues.push(`Released in ${movie.release_date.substring(0, 4)}`);
  if (Array.isArray(movie.genres) && movie.genres.length)
    clues.push(`Genres: ${movie.genres.map(g => g.name).join(', ')}`);
  if (movie.tagline) clues.push(`Tagline: "${movie.tagline}"`);
  if (credits && credits.cast && credits.cast[0]) {
    clues.push(`Stars: ${credits.cast[0].name}`);
  }
  if (credits && credits.crew) {
    const director = credits.crew.find(p => p.job === 'Director');
    if (director) clues.push(`Director: ${director.name}`);
  }
  if (movie.original_language === 'ta') clues.push('Original language: Tamil');
  if (movie.popularity > 15) clues.push('Was a popular hit!');
  return clues;
}

// Error wrapped utility for all
export async function safeApiCall(fn, ...args) {
  // PUBLIC_INTERFACE
  try {
    const result = await fn(...args);
    return [result, null];
  } catch (e) {
    return [null, e.message || 'An error occurred, please try again'];
  }
}

