import IndexDB_KEYS from "@constants/indexDbKeys";
import { useAppStore } from "@store/store";
import { getIndividualIndexDBData } from "@utils/getIndexDBData";
import { RefObject, useState } from "react";

export const useAudioPlayer = (props: {
  audioId?: string;
  audioRef?: RefObject<HTMLAudioElement>;
}) => {
  const { audioId, audioRef } = props;

  const { playingsongId, setPlayingSongId, playlistSongs, setCurrentlyPlaying } = useAppStore();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(10);

  const songPlayHandler = async (
    songData,
    audioRef: React.MutableRefObject<HTMLAudioElement>,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    console.log(songData, "asd");
    audioRef.current.src = URL.createObjectURL(songData?.fileUrl);
    setTimeout(() => {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log(error);
            setIsPlaying(false);
          });
      }
      setIsPlaying(true);
    }, 0);
  };

  const nextTrackHandler = async (): void => {
    const findNextId = playlistSongs.findIndex((item) => item._id === playingsongId);
    console.log(findNextId);
    const nextSongId =
      findNextId < playlistSongs.length - 1
        ? playlistSongs[findNextId + 1]._id
        : playlistSongs[0]._id;
    setPlayingSongId(nextSongId);
    const audioData = await getIndividualIndexDBData(IndexDB_KEYS.PLAYLIST, nextSongId);
    setCurrentlyPlaying({
      ...audioData,
      duration: Math.round(audioData.duration),
      name: audioData.name.split(".mp")[0],
      fileUrl: audioData?.fileUrl,
    });
    await songPlayHandler(audioData, audioRef, setIsPlaying);
  };

  const prevTrackHandler = async (): void => {
    console.log(playingsongId, playlistSongs);
    const findPrevId = playlistSongs.findIndex((item) => item._id === playingsongId);
    console.log(findPrevId);

    const prevSongId =
      findPrevId <= 0
        ? playlistSongs[playlistSongs.length - 1]._id
        : playlistSongs[findPrevId - 1]._id;
    setPlayingSongId(prevSongId);
    const audioData = await getIndividualIndexDBData(IndexDB_KEYS.PLAYLIST, prevSongId);
    setCurrentlyPlaying({
      ...audioData,
      duration: Math.round(audioData.duration),
      name: audioData.name.split(".mp")[0],
      fileUrl: audioData?.fileUrl,
    });
    await songPlayHandler(audioData, audioRef, setIsPlaying);
  };

  const playPauseHandler = () => {
    console.log(playingsongId);
    if (audioRef.current) {
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
    progress,
    nextTrackHandler,
    prevTrackHandler,
    playPauseHandler,
    setIsPlaying,
  };
};
