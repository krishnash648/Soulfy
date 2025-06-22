import React from 'react';
import { ArtistCard, Error, Loader } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading artists..." />;

  if (error) return <Error />;

  // The API returns an array of tracks/songs, so to get unique artists, map and filter:
  // But here we'll just render ArtistCard for each track's artist (first artist).
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => {
          const artist = track?.artists?.[0];
          if (!artist) return null; // Skip if no artist info

          return (
            <ArtistCard
              key={artist.adamid || artist.id || track.key || track.id}
              artist={artist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopArtists;
