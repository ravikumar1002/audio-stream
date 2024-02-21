import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { useAppStore } from "@store/store";

export const PlaylistSongCard = ({ song }) => {
  const { name, duration, _id } = song;
  const { setPlayingSongId } = useAppStore();
  // const { setIsPlaying } = useAudioPlayer();
  return (
    <div className="flex gap-3 flex-col sm:flex-row items-center justify-start bg-white shadow-md rounded-md p-4 m-2">
      <div className="flex gap-3  items-center ">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/181/181603.png"}
          alt={name}
          className="w-full sm:w-24 h-auto mb-4 sm:mb-0 sm:mr-4 rounded-md max-w-20 max-h-20"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500">{duration}</p>
        </div>
      </div>

      <div className="flex gap-6 m-auto">
        <button
          className="p-3 m-2 hover:bg-cyan-400"
          onClick={() => {
            setPlayingSongId(_id);
            // setIsPlaying(true);
          }}
        >
          Play
        </button>
        <button className="p-3 m-2 hover:bg-cyan-400">Delete</button>
      </div>
    </div>
  );
};
