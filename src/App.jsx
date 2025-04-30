import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MovieDetails from "./components/MovieDetails";
import Watchlist from "./pages/Watchlist";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState(null);

  useEffect(() => {
    fetchTrendingMovie();
  }, []);

  const fetchTrendingMovie = async () => {
    try {
      const response = await fetch(TRENDING_API);
      const data = await response.json();
      setTrendingMovie(data.results[0]);
    } catch (error) {
      console.error("Error fetching trending movie:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchMovies(searchQuery);
    } else {
      setMovies([]);
    }
  }, [searchQuery]);

  const fetchMovies = async (query) => {
    try {
      const response = await fetch(`${SEARCH_API}${query}`);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              movies={movies}
              setMovies={setMovies}
              trendingMovie={trendingMovie}
            />
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
  );
};

export default App;
