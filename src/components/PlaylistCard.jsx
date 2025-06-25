import { Link } from 'react-router-dom';

const PlaylistCard = ({ playlist }) => {
  const coverUrl = playlist.coverUrl || playlist.artworkUrl || 'https://via.placeholder.com/500';
  const playlistTitle = playlist.title || playlist.name || 'Unknown Playlist';
  const creatorName = playlist.creator || playlist.creatorName || 'Unknown Creator';
  const playlistId = playlist.id || playlist.playlistId || '';
  const creatorId = playlist.creatorId || '';

  return (
    <div className="flex flex-col w-[220px] p-4 bg-gradient-to-br from-white/10 via-[#23272a]/60 to-[#18181f]/90 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-transparent hover:border-accent/80 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 group">
      <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={coverUrl}
          alt="playlist cover"
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-lg text-white truncate mb-1">
          <Link to={playlistId ? `/playlists/${playlistId}` : '#'}>{playlistTitle}</Link>
        </p>
        <p className="text-sm truncate text-gray-300">
          <Link to={creatorId ? `/users/${creatorId}` : '#'}>{creatorName}</Link>
        </p>
      </div>
    </div>
  );
};

export default PlaylistCard; 