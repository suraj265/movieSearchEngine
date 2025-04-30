import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import useWatchlist from "./hooks/useWatchlist"; // Import Watchlist Hook

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const TRENDING_API = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState(null);
  const { watchlist, toggleWatchlist } = useWatchlist(); // Use Watchlist Hook

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
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <h1 className="text-2xl font-bold">MovieZone</h1>
        <div className="flex items-center bg-gray-700 p-2 rounded-lg">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-transparent outline-none px-2 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-gray-400" />
        </div>
        <Link to="/watchlist" className="text-white bg-blue-600 px-4 py-2 rounded-lg">Watchlist</Link>
      </nav>

      <header
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: trendingMovie
            ? `url(https://image.tmdb.org/t/p/w1280${trendingMovie.backdrop_path})`
            : "url('https://source.unsplash.com/1600x900/?movie')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h2 className="text-3xl font-bold">{trendingMovie?.title || "Trending Movie"}</h2>
          <button className="mt-4 px-6 py-2 bg-red-600 rounded-lg text-lg">Watch Now</button>
        </div>
      </header>

      <section className="p-6">
        <h3 className="text-xl font-semibold mb-4">{searchQuery ? "Search Results" : "Recommended Movies"}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded-lg cursor-pointer">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <p className="mt-2 text-center">{movie.title}</p>
                </Link>
                <button
                    className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md w-full"
                    onClick={() => toggleWatchlist(movie)}
                >
                    {watchlist.some((m) => m.id === movie.id) ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-4">
              {searchQuery ? "No movies found." : "Search to find movies!"}
            </p>
          )}
        </div>
      </section>

      <footer className="bg-gray-800 text-center p-4 mt-6">
        <p>&copy; 2025 MovieZone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
