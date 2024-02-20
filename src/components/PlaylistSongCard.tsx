export const PlaylistSongCard = ({ song }) => {
  return (
    <div className="flex gap-3 items-center justify-start bg-white shadow-md rounded-md p-4 m-2">
      <img
        src={"https://cdn-icons-png.flaticon.com/512/181/181603.png"}
        alt={song.name}
        className="w-full sm:w-24 h-auto mb-4 sm:mb-0 sm:mr-4 rounded-md max-w-20 max-h-20"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{song.name}</h3>
        <p className="text-gray-500">{song.size}</p>
      </div>
    </div>
  );
};
