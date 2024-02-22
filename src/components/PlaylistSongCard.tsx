import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { IPlaylistSongCardDTO } from "@dto/playlistDTO";
import { useAppStore } from "@store/store";
import { useDeleteAudioFRomIndexDB } from "@hooks/useDeleteAudioFromIndexDB";
import MusicWaveIcon from "./atoms/MusicWaveIcon";

export const PlaylistSongCard = ({ song }: { song: IPlaylistSongCardDTO }) => {
  const { name, duration, _id } = song;
  const { setPlayingSongId, isPlaying, playingsongId, setCurrrentProgress } = useAppStore();
  const { deleteAudioFromDb } = useDeleteAudioFRomIndexDB();

  const isThisAudioPlaying = playingsongId === _id;

  function secondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  }

  return (
    <div
      className={`mx-2 mt-4 flex flex-col items-center justify-between gap-3 rounded-lg border bg-white p-3 sm:flex-row sm:p-4 ${isThisAudioPlaying ? "drop-shadow-none" : "drop-shadow-md"}`}
    >
      <div className="sm:gap3 flex w-full grow items-center gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/181/181603.png"
          alt={name}
          className="mb-2 h-auto max-h-10 w-full max-w-10 rounded-md sm:mb-0 sm:mr-4 sm:max-h-10 sm:w-24 sm:max-w-10"
        />
        <div
          className={`flex flex-col ${playingsongId === _id ? "text-lime-500" : "text-inherit"}`}
        >
          <h3 className="break-all text-sm font-semibold sm:text-base">{name}</h3>
          <p className="text-gray-500">{`${secondsToMinutes(duration)}`}</p>
        </div>
      </div>

      <div className="flex gap-3 font-semibold sm:gap-4">
        {!isThisAudioPlaying ? (
          <button
            className="rounded-full p-2 hover:bg-slate-200 sm:m-2 sm:p-3"
            onClick={() => {
              setPlayingSongId(_id);
              setCurrrentProgress(0);
            }}
          >
            <FaPlay
              style={{
                color: "rgb(132, 204, 22)",
              }}
            />
          </button>
        ) : (
          <div className="flex h-6 items-center justify-center rounded-sm p-2 sm:m-2  sm:p-3">
            <MusicWaveIcon pause={!isPlaying} />
          </div>
        )}
        <button
          className="rounded-full p-2 hover:bg-slate-200  sm:m-2 sm:px-2"
          onClick={() => {
            deleteAudioFromDb(_id);
          }}
          title="Delete Audio"
        >
          <IoClose
            style={{
              color: "red",
            }}
          />
        </button>
      </div>
    </div>
  );
};
