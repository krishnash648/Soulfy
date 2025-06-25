import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const artistId = track?.artists?.[0]?.adamid;

  const handleClick = () => {
    if (artistId) navigate(`/artists/${artistId}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View artist ${track?.subtitle}`}
      className="flex flex-col w-[220px] p-4 bg-gradient-to-br from-white/10 to-[#23272a]/80 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-transparent hover:border-accent/80 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 group"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-xl mb-4">
        <img
          alt={track?.subtitle ? `${track.subtitle} cover art` : 'Artist cover art'}
          src={track?.images?.coverart || 'https://placehold.co/500x500?text=Artist'}
          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className="font-semibold text-lg text-white truncate text-center">{track?.subtitle}</p>
    </div>
  );
};

export default ArtistCard;
