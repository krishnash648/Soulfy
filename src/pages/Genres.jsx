import { useState } from 'react';
import { genres } from '../assets/constants';
import SongCard from '../components/SongCard';
import { useSelector } from 'react-redux';

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState('POP');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const fetchGenreSongs = async (genre) => {
    setLoading(true);
    setError(null);
    setSongs([]);
    try {
      const proxy = 'https://corsproxy.io/?';
      const url = `${proxy}https://api.deezer.com/search?q=genre%3A${encodeURIComponent(genre)}`;
      const res = await fetch(url);
      const data = await res.json();
      setSongs(data.data || []);
    } catch (err) {
      setError('Failed to fetch songs for this genre.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch songs for the default genre on mount
  useState(() => { fetchGenreSongs(selectedGenre); }, []);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    fetchGenreSongs(genre);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-6">Browse by Genre</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {genres.map((g) => (
          <button
            key={g.value}
            onClick={() => handleGenreClick(g.title)}
            className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 ${selectedGenre === g.title ? 'bg-accent text-white border-accent' : 'bg-black text-gray-200 border-accent/40 hover:bg-accent/20'}`}
          >
            {g.title}
          </button>
        ))}
      </div>
      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.id}
            song={{
              id: song.id,
              attributes: {
                name: song.title,
                artistName: song.artist.name,
                artwork: { url: song.album.cover_big },
              },
              preview: song.preview,
              hub: { actions: [null, { uri: song.preview }] },
            }}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs.map(s => ({
              id: s.id,
              attributes: {
                name: s.title,
                artistName: s.artist.name,
                artwork: { url: s.album.cover_big },
              },
              preview: s.preview,
              hub: { actions: [null, { uri: s.preview }] },
            }))}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Genres; 