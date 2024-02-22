import { PlaylistSongCard } from "@components/PlaylistSongCard";
import { useAppStore } from "@store/store";

export const HomePage = () => {
  const { playlistSongs, deletingStatusAlert, addingStatusAlert } = useAppStore();
  return (
    <div>
      {addingStatusAlert && (
        <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-md">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 16.333H8m0 0L12 12l-4-4m4 4l4-4m0 4V5.667a1.666 1.666 0 00-1.666-1.666H9.666A1.666 1.666 0 008 5.667V12m0 3.333v3.334A1.667 1.667 0 009.667 20h4.666a1.667 1.667 0 001.667-1.666V15.333"
            ></path>
          </svg>
          <p className="text-gray-600">Uploading...</p>
        </div>
      )}
      {deletingStatusAlert && (
        <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-md">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <p className="text-gray-600">Deleting...</p>
        </div>
      )}

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
