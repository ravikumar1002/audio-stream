import { useEffect, useRef, useState } from "react";
import { PlayerController } from "./PlayerController";
import IndexDB_KEYS from "@constants/indexDbKeys";
import { getIndividualIndexDBData } from "@utils/getIndexDBData";
import { useAppStore } from "@store/store";
import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { AudioProgressBar } from "./AudioProgressBar";
import { VolumeController } from "./VolumeController";

function formatDurationDisplay(duration: number) {
  const min = Math.floor(duration / 60);
  const sec = Math.floor(duration - min * 60);

  const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

  return formatted;
}

export const AudioPlayer = ({ audioId }: { audioId: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {
    currentlyPlaying,
    setCurrentlyPlaying,
    playingsongId,
    duration,
    setDuration,
    currrentProgress,
    setCurrrentProgress,
    buffered,
    setBuffered,
    volume,
    setVolume,
  } = useAppStore();
  const [isReady, setIsReady] = useState(false);

  const { isPlaying, nextTrackHandler, prevTrackHandler, playPauseHandler, setIsPlaying } =
    useAudioPlayer({ audioId, audioRef });

  useEffect(() => {
    (async () => {
      const audioData = await getIndividualIndexDBData(IndexDB_KEYS.PLAYLIST, audioId);
      setCurrentlyPlaying({
        ...audioData,
        duration: Math.round(audioData.duration),
        name: audioData.name.split(".mp")[0],
        fileUrl: audioData?.fileUrl,
      });
    })();
  }, [audioId]);

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime) {
          const bufferedLength = audio.buffered.end(audio.buffered.length - 1 - i);
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <div className="bg-gray-200 h-full relative">
      <div className="flex justify-between py-3 px-6 max-w-7xl mx-auto h-full">
        {currentlyPlaying && audioId && (
          <audio
            ref={audioRef}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onEnded={nextTrackHandler}
            onCanPlay={(e) => {
              e.currentTarget.volume = volume;
              setIsReady(true);
            }}
            onTimeUpdate={(e) => {
              setCurrrentProgress(e.currentTarget.currentTime);
              handleBufferProgress(e);
            }}
            onProgress={handleBufferProgress}
            onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
          >
            <source type="audio/mpeg" src={URL.createObjectURL(currentlyPlaying?.fileUrl)} />
          </audio>
        )}
        <div className="flex items-center">
          <PlayerController
            isPlaying={isPlaying}
            prevTrackHandler={prevTrackHandler}
            playPauseHandler={playPauseHandler}
            nextTrackHandler={nextTrackHandler}
          />
        </div>
        <div className="flex-grow text-center">
          <h3 className="text-xl font-semibold">{currentlyPlaying?.name}</h3>
        </div>
        <div className="flex items-center justify-end">
          <VolumeController audioRef={audioRef} setVolume={setVolume} volume={volume} />
        </div>
      </div>
      <AudioProgressBar
        duration={duration}
        currentProgress={currrentProgress}
        buffered={buffered}
        onChange={(e) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = e.currentTarget.valueAsNumber;
          setCurrrentProgress(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};
