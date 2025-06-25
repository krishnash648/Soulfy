import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const artistId = song.relationships?.artists?.data?.[0]?.id || null;
  const artistName = song.attributes?.artistName || 'Unknown Artist';

  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favs.some((s) => s.id === song.id);
  });

  const handleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      favs = favs.filter((s) => s.id !== song.id);
    } else {
      favs.push(song);
    }
    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const artworkUrl = song.attributes?.artwork?.url ? song.attributes.artwork.url.replace('{w}x{h}', '500x500') : 'https://via.placeholder.com/500';

  const isActive = activeSong?.attributes?.name === song.attributes?.name;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-card text-main backdrop-blur-xl rounded-2xl shadow-xl border-2 border-transparent transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl group relative hover:border-accent/80">
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 z-10 bg-black/60 rounded-full p-2 hover:bg-accent/80 transition"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <FaHeart className="text-pink-500" size={22} /> : <FaRegHeart className="text-white" size={22} />}
      </button>
      <div className="relative w-full h-56 overflow-hidden rounded-xl mb-4">
        <img alt="song_img" src={artworkUrl} className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300" />
        <div
          className={`absolute inset-0 flex justify-center items-center bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100 bg-black/60' : ''}`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isActive={isActive} 
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-main truncate">
          <Link to={`/songs/${song.id}`}>{song.attributes?.name}</Link>
        </p>
        <p className="text-sm truncate text-secondary mt-1">
          <Link to={artistId ? `/artists/${artistId}` : '/top-artists'}>
            {artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
