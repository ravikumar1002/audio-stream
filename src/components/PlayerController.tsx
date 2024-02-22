interface ISongController {
  isPlaying: boolean;
  prevTrackHandler: () => void;
  playPauseHandler: () => void;
  nextTrackHandler: () => void;
}

export const PlayerController = (props: ISongController) => {
  const { isPlaying, prevTrackHandler, playPauseHandler, nextTrackHandler } = props;
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 "
        onClick={prevTrackHandler}
        title="Previous"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
          id="previous"
        >
          <path
            fill="#212121"
            d="M13.75 13.0351C13.75 13.8459 12.8357 14.3196 12.1733 13.852L5.04034 8.81698C4.47592 8.41857 4.47592 7.58146 5.04034 7.18305L12.1733 2.14801C12.8357 1.68042 13.75 2.15416 13.75 2.96498L13.75 13.0351zM1.75 13.25C1.75 13.6642 2.08579 14 2.5 14 2.91421 14 3.25 13.6642 3.25 13.25L3.25 2.75C3.25 2.33579 2.91421 2 2.5 2 2.08579 2 1.75 2.33579 1.75 2.75V13.25z"
          ></path>
        </svg>
      </button>
      <button
        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 "
        onClick={playPauseHandler}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            id="pause"
          >
            <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
      <button
        className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 "
        onClick={nextTrackHandler}
        title="Next"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
          id="next"
        >
          <path
            fill="#212121"
            d="M2 2.96495C2 2.15413 2.91427 1.68039 3.57668 2.14798L10.7097 7.18302C11.2741 7.58143 11.2741 8.41854 10.7097 8.81695L3.57668 13.852C2.91427 14.3196 2 13.8458 2 13.035V2.96495zM14 2.75C14 2.33579 13.6642 2 13.25 2 12.8358 2 12.5 2.33579 12.5 2.75V13.25C12.5 13.6642 12.8358 14 13.25 14 13.6642 14 14 13.6642 14 13.25V2.75z"
          ></path>
        </svg>
      </button>
    </div>
  );
};
