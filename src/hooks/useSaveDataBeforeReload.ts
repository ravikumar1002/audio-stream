import { ICurrentlyPlaying, IPlaylistSong, useAppStore } from "@store/store";

interface ISaveDAtaToLocalStroge {
  volume: number;
  duration: number;
  currrentProgress: number;
  isAudioMuted: boolean;
  playingsongId: string | null;
  buffered: number;
}

export const useSaveDataBeforeReload = () => {
  const { volume, duration, isAudioMuted, currrentProgress, playingsongId, buffered } =
    useAppStore();

  function saveDataToLocalStorage(data: ISaveDAtaToLocalStroge) {
    localStorage.setItem("appData", JSON.stringify(data));
  }

  window.addEventListener("beforeunload", function (event) {
    const dataToSave = {
      volume,
      duration,
      isAudioMuted,
      currrentProgress,
      playingsongId,
      buffered,
    };

    saveDataToLocalStorage(dataToSave);
  });
};
