import { IPlaylistSongData } from "@components/AudioPlayer";
import IndexDB_KEYS from "@constants/indexDbKeys";
import { useAppStore } from "@store/store";
import { getIndividualIndexDBData } from "@utils/getIndexDBData";
import { useEffect, useRef, useState } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { playingsongId, setPlayingSongId, playlistSongs, setCurrentlyPlaying } = useAppStore();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const audioData = await getIndividualIndexDBData<IPlaylistSongData>(
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

  useEffect(autoPlayAudio, [playingsongId]);

  const nextTrackHandler = async () => {
    const findNextId = playlistSongs.findIndex((item) => item._id === playingsongId);
    const nextSongId =
      findNextId < playlistSongs.length - 1
        ? playlistSongs[findNextId + 1]._id
        : playlistSongs[0]._id;
    setPlayingSongId(nextSongId);
  };

  const prevTrackHandler = async () => {
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
    isPlaying,
    nextTrackHandler,
    prevTrackHandler,
    playPauseHandler,
    setIsPlaying,
    audioRef,
  };
};
