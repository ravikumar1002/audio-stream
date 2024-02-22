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
            <div>
              <h4>Empty</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
