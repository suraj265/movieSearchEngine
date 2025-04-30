import { useWatchlist } from "./hooks/useWatchlist"; // Import Hook

const MovieCard = ({ movie }) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isInWatchlist = watchlist.some((item) => item.id === movie.id);

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button 
        onClick={() => isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
        className={isInWatchlist ? "remove-btn" : "add-btn"}
      >
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
