import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ArtistCard, Loader, Error } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  // Extract unique artists from the top charts
  const uniqueArtists = data ? Array.from(
    new Map(
      data
        .flatMap(song => (song.relationships?.artists?.data || []).map(artist => ({
          adamid: artist.id,
          name: song.attributes?.artistName,
          avatar: song.attributes?.artwork?.url ? song.attributes.artwork.url.replace('{w}x{h}', '500x500') : '',
        })))
        .map(artist => [artist.adamid, artist])
    ).values()
  ) : [];

  if (isFetching) return <Loader title="Loading Top Artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {uniqueArtists.map((artist, idx) => (
          <ArtistCard
            key={artist.adamid || idx}
            track={{ subtitle: artist.name, images: { coverart: artist.avatar || artist.background || '' }, artists: [{ adamid: artist.adamid }] }}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
