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
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <img
        alt={track?.subtitle ? `${track.subtitle} cover art` : 'Artist cover art'}
        src={track?.images?.coverart}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">{track?.subtitle}</p>
    </div>
  );
};

export default ArtistCard;
