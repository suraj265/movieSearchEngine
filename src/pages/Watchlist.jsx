import useWatchlist from "../hooks/useWatchlist";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center relative">
      {/* Back to Home button at top-left */}
      <Link
        to="/"
        className="absolute top-4 left-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
      >
        Back to Home
      </Link>
      
      <h2 className="text-3xl font-bold text-center mb-6">Your Watchlist</h2>
      
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-gray-400">No movies in your watchlist.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2 text-center">{movie.title}</h3>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 active:scale-95 text-white py-2 rounded-lg cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
