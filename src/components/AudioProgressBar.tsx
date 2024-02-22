interface IAudioProgressBar extends React.ComponentPropsWithoutRef<"input"> {
  duration: number;
  currentProgress: number;
}

export const AudioProgressBar = (props: IAudioProgressBar) => {
  const { duration, currentProgress, ...rest } = props;
  return (
    <div className="absolute h-1 -top-[4px] left-0 right-0 group">
      <input
        type="range"
        name="progress"
        className={`progress-bar absolute inset-0 w-full m-0 h-full bg-transparent appearance-none cursor-pointer dark:bg-gray-700 transition-all accent-amber-600 hover:accent-amber-600 `}
        min={0}
        step={0.01}
        max={duration}
        value={currentProgress}
        {...rest}
      />
    </div>
  );
};
