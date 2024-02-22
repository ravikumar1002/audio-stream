import { PlaylistSongCard } from "@components/PlaylistSongCard";
import { useAppStore } from "@store/store";

export const HomePage = () => {
  const { playlistSongs } = useAppStore();
  return (
    <div>
      <div className="mt-8">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((audio) => {
            return <PlaylistSongCard key={audio._id} song={audio} />;
          })
        ) : (
          <div className="mt-8">
            <div className="flex w-full justify-center items-center h-full">
              <h4 className="text-xl sm:text-2xl font-semibold">Empty</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
