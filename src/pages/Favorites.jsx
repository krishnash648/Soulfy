import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(favs);
  }, []);

  const removeFavorite = (songId) => {
    const updated = favorites.filter((song) => song.id !== songId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (!favorites.length) {
    return <div className="text-center text-gray-400 mt-16 text-xl">No favorite songs yet. Add some from any song card!</div>;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Your Favorites</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {favorites.map((song, i) => (
          <div key={song.id} className="relative">
            <SongCard
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={favorites}
              i={i}
            />
            <button
              onClick={() => removeFavorite(song.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600 transition"
              title="Remove from favorites"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 