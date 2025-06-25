import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import Loader from './Loader';
import Error from './Error';

import 'swiper/css';
import 'swiper/css/free-mode';

const unsplashArts = [
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80',
];

const fallbackArt = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=500&q=80';

const getSongImage = (song) => {
  if (song?.images?.coverart) return song.images.coverart;
  if (song?.attributes?.artwork?.url) return song.attributes.artwork.url.replace('{w}x{h}', '200x200');
  return 'https://via.placeholder.com/200';
};

const getSongTitle = (song) => song?.title || song?.attributes?.name || 'Unknown Title';
const getSongSubtitle = (song) => song?.subtitle || song?.attributes?.artistName || 'Unknown Artist';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${activeSong?.attributes?.name === song.attributes?.name ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={song.attributes?.artwork?.url ? song.attributes.artwork.url.replace('{w}x{h}', '500x500') : 'https://via.placeholder.com/200'}
        alt={song.attributes?.name || 'No Title'}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song.attributes?.name}</p>
        </Link>
        <Link to={song.relationships?.artists?.data?.[0]?.id ? `/artists/${song.relationships.artists.data[0].id}` : '/top-artists'}>
          <p className="text-base text-gray-300 mt-1">{song.attributes?.artistName}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  const { data, isFetching, error } = useGetTopChartsQuery();

  // Extract unique artists from the top charts
  const uniqueArtists = data ? Array.from(
    new Map(
      data.flatMap(song => song.artists || []).map(artist => [artist.adamid, artist])
    ).values()
  ) : [];

  if (isFetching) return <Loader title="Loading Top Artists..." />;
  if (error) return <Error />;

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {data?.map((song, i) => (
            <TopChartCard
              key={song.key || song.id || i}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={() => dispatch(playPause(false))}
              handlePlayClick={(song, i) => {
                dispatch(setActiveSong({ song, data, i }));
                dispatch(playPause(true));
              }}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {uniqueArtists.map((artist, i) => (
            <SwiperSlide
              key={artist.adamid || i}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link
                to={`/artists/${artist.adamid}`}
                className="shadow-lg rounded-full animate-slideright"
              >
                <img
                  src={artist.avatar || artist.background || 'https://placehold.co/500x500?text=Artist'}
                  alt={artist.name}
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
