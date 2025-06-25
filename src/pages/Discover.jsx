import { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { useSelector } from 'react-redux';

const Discover = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    fetch('http://localhost:5001/api/shazam')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => setError('Failed to fetch from proxy'));
  }, []);

  if (error) return <div className="text-main">{error}</div>;
  if (!songs.length) return <div className="text-main">Loading...</div>;

  return (
    <div className="flex flex-wrap sm:justify-start justify-center gap-8 bg-main min-h-screen">
      {songs.map((song, i) => (
        <SongCard
          key={song.id || i}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={songs}
          i={i}
        />
      ))}
    </div>
  );
};

export default Discover;
