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
    isPlaying,
    setIsPlaying,
  } = useAppStore();

  const { nextTrackHandler, prevTrackHandler, playPauseHandler, audioRef } = useAudioPlayer();

  return (
    <div className="relative h-full bg-gray-200 ">
      <div className="mx-auto flex h-full max-w-7xl flex-wrap items-center justify-between px-6 py-3 sm:flex-nowrap">
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
        <div className="-order-1 w-full flex-grow text-center sm:order-none">
          <h3 className="break-all text-sm font-semibold sm:px-3 sm:text-base">
            {currentlyPlaying?.name}
          </h3>
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
