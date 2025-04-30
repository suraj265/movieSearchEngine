import { useState, useEffect } from "react";

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  // **Toggle function**
  const toggleWatchlist = (movie) => {
    if (watchlist.some((m) => m.id === movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist };
};

export default useWatchlist;
