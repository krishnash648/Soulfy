import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SongCard from '../components/SongCard';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const proxy = "https://corsproxy.io/?";
      const url = `${proxy}https://api.deezer.com/search?q=${encodeURIComponent(searchTerm)}`;
      const res = await fetch(url);
      const data = await res.json();
      setSongs(data.data || []);
    } catch (err) {
      setError('Failed to fetch songs from Deezer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSearch} className="mb-8 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search for songs or artists..."
          className="flex-1 p-3 rounded-lg bg-black text-white border border-gray-700 focus:border-accent outline-none"
        />
        <button type="submit" className="bg-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-600 transition">Search</button>
      </form>
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
              preview: song.preview, // for player
              hub: { actions: [null, { uri: song.preview }] }, // for player compatibility
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

export default Search;
