import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SongCard from '../components/SongCard';
import { Loader, Error } from '../components';

const regions = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IN', name: 'India' },
  { code: 'JP', name: 'Japan' },
  { code: 'BR', name: 'Brazil' },
];

const AroundYou = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [region, setRegion] = useState('US');
  const [songs, setSongs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);
    fetch(`http://localhost:5001/api/shazam?country_code=${region}`)
      .then(res => res.json())
      .then(data => setSongs(Array.isArray(data) ? data : []))
      .catch(() => setError('Failed to fetch songs for this region.'))
      .finally(() => setIsFetching(false));
  }, [region]);

  if (isFetching) return <Loader title={`Loading top tracks in ${regions.find(r => r.code === region)?.name}...`} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 mb-10">
        <div>
          <h2 className="font-bold text-3xl text-white text-left">Around You</h2>
          <p className="text-gray-300 mt-1">Trending in your area</p>
        </div>
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="bg-black text-pink-400 border border-accent p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {regions.map(r => (
            <option key={r.code} value={r.code}>{r.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.length > 0 ? songs.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
          />
        )) : (
          <p className="text-gray-400">No songs available for this region yet.</p>
        )}
      </div>
    </div>
  );
};

export default AroundYou;
