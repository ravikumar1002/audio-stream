import { useAppStore } from "@store/store";

interface ISaveDAtaToLocalStroge {
  volume: number;
  duration: number;
  currrentProgress: number;
  isAudioMuted: boolean;
  playingsongId: string | null;
}

export const useSaveDataBeforeReload = () => {
  const { volume, duration, isAudioMuted, currrentProgress, playingsongId } = useAppStore();

  function saveDataToLocalStorage(data: ISaveDAtaToLocalStroge) {
    localStorage.setItem("appData", JSON.stringify(data));
  }

  window.addEventListener("beforeunload", function () {
    const dataToSave = {
      volume,
      duration,
      isAudioMuted,
      currrentProgress,
      playingsongId,
    };

    saveDataToLocalStorage(dataToSave);
  });
};
