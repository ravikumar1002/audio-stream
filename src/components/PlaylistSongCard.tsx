import { IPlaylistSongCardDTO } from "@dto/playlistDTO";
import { useAudioPlayer } from "@hooks/useAudioPlayer";
import { useAppStore } from "@store/store";

import "./playlist-song_card.css";
import { useDeleteAudioFRomIndexDB } from "@hooks/useDeleteAudioFromIndexDB";

export const PlaylistSongCard = ({ song }: { song: IPlaylistSongCardDTO }) => {
  const { name, duration, _id } = song;
  const { setPlayingSongId, isPlaying, setIsPlaying, playingsongId } = useAppStore();
  const { playPauseHandler } = useAudioPlayer();
  const { deleteAudioFromDb } = useDeleteAudioFRomIndexDB();

  return (
    <div className="flex gap-3 flex-col sm:flex-row items-center justify-start bg-white shadow-md rounded-md p-4 m-2">
      <div className="flex gap-3 grow  items-center ">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/181/181603.png"}
          alt={name}
          className="w-full sm:w-24 h-auto mb-4 sm:mb-0 sm:mr-4 rounded-md max-w-20 max-h-20"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold break-all">{name}</h3>
          <p className="text-gray-500">{duration}</p>
        </div>
      </div>

      <div className="flex gap-6 m-auto font-semibold">
        <button
          className="px-2 m-2 hover:bg-slate-200  rounded-sm"
          onClick={() => {
            deleteAudioFromDb(_id);
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              viewBox="0 0 24 24"
              id="delete"
              className="h-6"
            >
              <path
                fill="#ffa9a9"
                d="M18.8,8.1l-1.7,11.2c-0.2,1-1,1.7-2,1.7h-3c1,0,1.8-0.7,2-1.7l1.7-11.2c0.1-0.6-0.4-1.1-1-1.1h3C18.5,7,18.9,7.5,18.8,8.1z"
              ></path>
              <path
                fill="#ff4d4d"
                d="M17.8 6H6.2C5.6 6 5 6.3 4.6 6.7c-.4.4-.5 1-.5 1.6l1.7 11.1c.2 1.5 1.5 2.6 3 2.6h6.3c1.5 0 2.7-1.1 3-2.5l1.7-11.1c.1-.6-.1-1.2-.5-1.6C19 6.3 18.4 6 17.8 6zM16.1 19.2c-.1.5-.5.8-1 .8H8.8c-.5 0-.9-.4-1-.9L6.2 8h11.7L16.1 19.2zM5 5h14c.6 0 1-.4 1-1s-.4-1-1-1h-4c0-.6-.4-1-1-1h-4C9.4 2 9 2.4 9 3H5C4.4 3 4 3.4 4 4S4.4 5 5 5z"
              ></path>
              <path
                fill="#ff4d4d"
                d="M12,19c0.6,0,1-0.4,1-1v-6c0-0.6-0.4-1-1-1s-1,0.4-1,1v6C11,18.6,11.4,19,12,19z"
              ></path>
            </svg>
          </span>
        </button>
        {playingsongId !== _id ? (
          <button
            className="p-2 m-2 rounded-sm hover:bg-slate-200"
            onClick={() => {
              setPlayingSongId(_id);
            }}
          >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Play" className="h-6">
                <path
                  d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                  fill="#34a853"
                  className="color000000 svgShape"
                ></path>
              </svg>
            </span>
          </button>
        ) : (
          <button
            className="p-2 m-2 rounded-sm hover:bg-slate-200"
            onClick={() => {
              playPauseHandler();
            }}
          >
            {isPlaying ? (
              <span className="h-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  id="Pause"
                  className="h-6"
                >
                  <path
                    d="M12 38h8V10h-8v28zm16-28v28h8V10h-8z"
                    fill="#34a853"
                    className="color000000 svgShape"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  id="Play"
                  className="h-6"
                >
                  <path
                    d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                    fill="#34a853"
                    className="color000000 svgShape"
                  ></path>
                </svg>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
