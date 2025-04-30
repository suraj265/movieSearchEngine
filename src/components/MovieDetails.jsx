import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const MOVIE_DETAILS_API = "https://api.themoviedb.org/3/movie/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const response = await fetch(`${MOVIE_DETAILS_API}${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);

        // Fetch movie trailer
        fetchMovieTrailer(data.id);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const fetchMovieTrailer = async (movieId) => {
    try {
      // Fetch movie trailer
      const response = await fetch(`${MOVIE_DETAILS_API}${movieId}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      const trailer = data.results.find((video) => video.type === "Trailer");

      // Check if trailer exists
      if (trailer) {
        // YouTube trailer URL
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!movie) return <p className="text-white">Loading...</p>;

  const fullPosterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500";

  return (
    <div className="text-white min-h-screen bg-gray-900 flex flex-col items-center justify-center px-2 py-4">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <img src={fullPosterUrl} alt={movie.title} className="w-64 h-auto rounded-lg shadow-lg mt-4" />
      <p className="mt-2 text-lg">{movie.overview}</p>

      {/* Trailer Embed */}
      {trailerUrl ? (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-xl font-semibold">Watch the Trailer</h2>
          <iframe
            className="w-full h-[500px] mt-4"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="mt-4 text-gray-400">No trailer available for this movie.</p>
      )}

      {/* Add to Watchlist Button */}
      <button
        className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 active:scale-95 transition transform duration-150 ease-in-out rounded-lg text-lg cursor-pointer"
        onClick={() => addToWatchlist(movie)}
      >
        Add to Watchlist
      </button>

      <button
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition transform duration-150 ease-in-out rounded-lg text-lg cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default MovieDetails;
