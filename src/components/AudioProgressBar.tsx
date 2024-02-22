interface IAudioProgressBar extends React.ComponentPropsWithoutRef<"input"> {
  duration: number;
  currentProgress: number;
}

export const AudioProgressBar = (props: IAudioProgressBar) => {
  const { duration, currentProgress, ...rest } = props;
  const elapsedTime = (currentProgress / duration) * 100;

  return (
    <div className="group absolute -top-[4px] left-0 right-0 h-1">
      <input
        type="range"
        name="progress"
        className={`track progress-bar absolute inset-0 m-0 h-full w-full cursor-pointer appearance-none bg-transparent accent-slate-900 transition-all hover:accent-slate-900  dark:bg-gray-700 `}
        min={0}
        step={0.01}
        max={duration}
        style={{
          background: `linear-gradient(to right, black 0%, black ${elapsedTime}%, grey ${elapsedTime}%, grey 100%)`,
        }}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};
