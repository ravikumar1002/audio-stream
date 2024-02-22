import IndexDB_KEYS from "@constants/indexDbKeys";
import { IAudioPlayerDataDTO } from "@dto/audioPlayerDataDto";
import { useAppStore } from "@store/store";
import { getIndividualIndexDBData } from "@utils/getIndexDBData";
import { useEffect, useRef } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    playingsongId,
    setPlayingSongId,
    playlistSongs,
    setCurrentlyPlaying,
    currentlyPlaying,
    isPlaying,
    setIsPlaying,
    setCurrrentProgress,
    currrentProgress,
  } = useAppStore();

  useEffect(() => {
    (async () => {
      const audioData = await getIndividualIndexDBData<IAudioPlayerDataDTO>(
        IndexDB_KEYS.PLAYLIST,
        playingsongId || "",
      );
      setCurrentlyPlaying({
        ...audioData,
        duration: Math.round(audioData.duration),
        name: audioData.name.split(".mp")[0],
        fileUrl: audioData?.fileUrl,
      });
    })();
  }, [playingsongId]);

  const autoPlayAudio = () => {
    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      audioRef.current?.play();
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  };

  const setAudioCurrentTime = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currrentProgress;
    }
  };

  useEffect(() => {
    setAudioCurrentTime();
  }, [currentlyPlaying]);

  useEffect(autoPlayAudio, [playingsongId]);

  const nextTrackHandler = async () => {
    setCurrrentProgress(0);
    const findNextId = playlistSongs.findIndex((item) => item._id === playingsongId);
    const nextSongId =
      findNextId < playlistSongs.length - 1
        ? playlistSongs[findNextId + 1]._id
        : playlistSongs[0]._id;
    setPlayingSongId(nextSongId);
  };

  const prevTrackHandler = async () => {
    setCurrrentProgress(0);
    const findPrevId = playlistSongs.findIndex((item) => item._id === playingsongId);
    const prevSongId =
      findPrevId <= 0
        ? playlistSongs[playlistSongs.length - 1]._id
        : playlistSongs[findPrevId - 1]._id;
    setPlayingSongId(prevSongId);
  };

  const playPauseHandler = () => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return {
    nextTrackHandler,
    prevTrackHandler,
    playPauseHandler,
    audioRef,
  };
};
