import { useEffect } from "react";
import { PlayerController } from "./PlayerController";
import { useAppStore } from "@store/store";
import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { AudioProgressBar } from "./AudioProgressBar";
import { VolumeController } from "./VolumeController";

export const AudioPlayer = () => {
  const {
    currentlyPlaying,
    duration,
    setDuration,
    currrentProgress,
    setCurrrentProgress,
    volume,
    setVolume,
  } = useAppStore();

  const {
    isPlaying,
    nextTrackHandler,
    prevTrackHandler,
    playPauseHandler,
    setIsPlaying,
    audioRef,
  } = useAudioPlayer();

  const setAudioCurrentTime = () => {
    if (audioRef.current) {
      console.log(typeof currrentProgress, "sdsd");
      audioRef.current.currentTime = currrentProgress;
    }
  };

  useEffect(() => {
    setAudioCurrentTime();
  }, []);

  return (
    <div className="h-full relative bg-gray-200 ">
      <div className="flex justify-between py-3 px-6 max-w-7xl mx-auto h-full items-center">
        {currentlyPlaying && (
          <audio
            ref={audioRef}
            key={currentlyPlaying._id}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onEnded={nextTrackHandler}
            onCanPlay={(e) => {
              e.currentTarget.volume = volume;
            }}
            onTimeUpdate={(e) => {
              setCurrrentProgress(e.currentTarget.currentTime);
            }}
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
        onChange={(e) => {
          if (!audioRef.current) return;
          audioRef.current.currentTime = e.currentTarget.valueAsNumber;
          setCurrrentProgress(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};
