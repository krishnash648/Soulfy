import React, { useRef, useEffect } from 'react';

const getAudioUrl = (song) => {
  return (
    song?.attributes?.previews?.[0]?.url || // ShazamCore/Apple Music
    song?.preview || // Deezer
    song?.hub?.actions?.[1]?.uri || // fallback (old logic)
    ''
  );
};

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={getAudioUrl(activeSong)}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
