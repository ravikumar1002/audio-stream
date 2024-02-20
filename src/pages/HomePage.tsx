import { PlaylistSongCard } from "@components/PlaylistSongCard";
import { useAppStore } from "@store/store";

export const HomePage = () => {
  const { playlistSongs } = useAppStore();
  return (
    <div>
      <p>Home page</p>
      <div>
        {playlistSongs.map((audio) => {
          return <PlaylistSongCard key={audio._id} song={audio} />;
        })}
      </div>
    </div>
  );
};
