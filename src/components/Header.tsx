import IndexDB_KEYS from "@constants/indexDbKeys";
import { IIndexDBQueueDataDTO } from "@dto/indexDbQueueDTO";
import { useAppStore } from "@store/store";
import { filterValueFromAudio } from "@utils/filterValueFromAudio";
import { getIndexDBKeyAllData } from "@utils/getIndexDBData";
import { uploadAudios } from "@utils/uploadAudios";
import { ChangeEventHandler } from "react";

export const Header = () => {
  const { setPlaylistSongs, setAddingStatusAlert } = useAppStore();

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setAddingStatusAlert(true);
      await uploadAudios(e.target.files);
      const queueList = await getIndexDBKeyAllData<IIndexDBQueueDataDTO>(
        IndexDB_KEYS.PLAYLIST_QUEUE,
      );
      if (queueList.length > 0) {
        const filterAudioData = await filterValueFromAudio(queueList[0].queueList);
        if (filterAudioData) {
          setPlaylistSongs(filterAudioData);
        }
      }
      setAddingStatusAlert(false);
    }
  };

  return (
    <header className="h-full bg-white">
      <nav
        className="mx-auto flex h-full items-center justify-between border-b-2 border-slate-300 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="gap-2p-1.5 -m-1.5 flex items-center ">
          <img
            className="h-8 w-auto"
            src="https://static.vecteezy.com/system/resources/previews/026/991/817/original/3d-streaming-music-online-icon-for-ui-ux-web-mobile-apps-social-media-ads-design-free-png.png"
            alt="Audio Stream"
          />
          <span className="text-xl font-semibold">Audio Stream</span>
        </div>

        <label
          htmlFor="upload-mp3"
          className="flex cursor-pointer items-center gap-2 rounded-md px-4  py-2 text-sm font-semibold text-gray-900 hover:bg-slate-100 "
        >
          <span>Upload Audio</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <input
            type="file"
            id="upload-mp3"
            className="hidden"
            multiple
            accept=".mp3,audio/*"
            onChange={handleFileUpload}
          />
        </label>
      </nav>
    </header>
  );
};
