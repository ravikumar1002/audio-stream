import { PlaylistSongCard } from "@components/PlaylistSongCard";
import { useAppStore } from "@store/store";

export const HomePage = () => {
  const { playlistSongs } = useAppStore();
  return (
    <div>
      <div className="mt-8">
        {playlistSongs ? (
          playlistSongs.map((audio) => {
            return <PlaylistSongCard key={audio._id} song={audio} />;
          })
        ) : (
          <div>
            {" "}
            <div>
              <h4>Empty</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
