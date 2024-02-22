import { PlaylistSongCard } from "@components/PlaylistSongCard";
import { useAppStore } from "@store/store";

export const HomePage = () => {
  const { playlistSongs, deletingStatusAlert, addingStatusAlert } = useAppStore();
  return (
    <div>
      {playlistSongs.length > 0 && (
        <div className="flex gap-4 px-4">
          <h3 className="text-lg font-semibold">Uploaded Files: </h3>
          <p className="text-lg font-semibold">{playlistSongs.length}</p>
        </div>
      )}
      {addingStatusAlert && (
        <div className="flex items-center rounded-md bg-gray-100 p-4 shadow-md">
          <svg
            className="mr-2 h-6 w-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 16.333H8m0 0L12 12l-4-4m4 4l4-4m0 4V5.667a1.666 1.666 0 00-1.666-1.666H9.666A1.666 1.666 0 008 5.667V12m0 3.333v3.334A1.667 1.667 0 009.667 20h4.666a1.667 1.667 0 001.667-1.666V15.333"
            ></path>
          </svg>
          <p className="text-gray-600">Uploading...</p>
        </div>
      )}
      {deletingStatusAlert && (
        <div className="flex items-center rounded-md bg-gray-100 p-4 shadow-md">
          <svg
            className="mr-2 h-6 w-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <p className="text-gray-600">Deleting...</p>
        </div>
      )}

      <div className="mt-1 sm:mt-4">
        {playlistSongs.length > 0 ? (
          playlistSongs.map((audio) => {
            return <PlaylistSongCard key={audio._id} song={audio} />;
          })
        ) : (
          <div className="mt-8">
            <div className="flex h-full w-full items-center justify-center">
              <h4 className="text-xl font-semibold sm:text-2xl">Upload Audio to play</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
