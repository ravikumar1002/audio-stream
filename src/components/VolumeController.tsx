interface IVolumeController {
  volume: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  setVolume: (isAudioMuted: number) => void;
}

export const VolumeController = (props: IVolumeController) => {
  const { volume, setVolume, audioRef } = props;

  const handleMuteUnmute = () => {
    if (!audioRef.current) return;

    if (audioRef.current.volume !== 0) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = 1;
    }
  };

  const handleVolumeChange = (volumeValue: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };
  return (
    <div className="flex gap-3 items-center justify-self-end">
      <button
        className="mr-2 focus:outline-none"
        onClick={handleMuteUnmute}
        aria-label={volume === 0 ? "unmute" : "mute"}
      >
        {volume === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 3l-1.5 1.5L7 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-7-7v14a2 2 0 0 0 3.287 1.57l5.2 3.714A1 1 0 0 0 22 22V2a1 1 0 0 0-1.513-.857l-5.2 3.715A2 2 0 0 0 14 5z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 3l-1.5 1.5L7 3M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-4 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0zm-3 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
            />
          </svg>
        )}
      </button>
      <input
        aria-label="volume"
        name="volume"
        type="range"
        min={0}
        step={0.05}
        max={1}
        value={volume}
        className="w-[80px] m-0 h-2 rounded-full accent-amber-600 bg-gray-700 appearance-none cursor-pointer"
        onChange={(e) => {
          handleVolumeChange(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};
