import { Link } from 'react-router-dom';

const AlbumCard = ({ album }) => {
  const albumArt = album.coverUrl || album.artworkUrl || 'https://via.placeholder.com/500';
  const albumTitle = album.title || album.name || 'Unknown Album';
  const artistName = album.artist || album.artistName || 'Unknown Artist';
  const albumId = album.id || album.albumId || '';
  const artistId = album.artistId || '';

  return (
    <div className="flex flex-col w-[220px] p-4 bg-gradient-to-br from-white/10 to-[#23272a]/80 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-transparent hover:border-accent/80 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 group">
      <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={albumArt}
          alt="album art"
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-white truncate mb-1">
          <Link to={albumId ? `/albums/${albumId}` : '#'}>{albumTitle}</Link>
        </p>
        <p className="text-sm truncate text-gray-300">
          <Link to={artistId ? `/artists/${artistId}` : '#'}>{artistName}</Link>
        </p>
      </div>
    </div>
  );
};

export default AlbumCard; 