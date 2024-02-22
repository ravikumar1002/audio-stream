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
    <div className="flex items-center gap-3 justify-self-end">
      <button
        className="mr-2 rounded-full  p-2 hover:bg-gray-300 focus:outline-none "
        onClick={handleMuteUnmute}
        aria-label={volume === 0 ? "unmute" : "mute"}
        title={volume === 0 ? "unmute" : "mute"}
      >
        {volume === 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="volumemute"
            className="h-6"
          >
            <path
              d="M7 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L11 9H8c-.55 0-1 .45-1 1z"
              fill="#000000"
              className="color000000 svgShape"
            ></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="volumeup" className="h-6">
            <path
              d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z"
              fill="#000000"
              className="color000000 svgShape"
            ></path>
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
        className="m-0 h-2 w-[80px] cursor-pointer rounded-full  accent-gray-700"
        onChange={(e) => {
          handleVolumeChange(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};
