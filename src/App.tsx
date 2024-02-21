import "./App.css";
import { useEffect, useLayoutEffect } from "react";
import { getIndexDBKeyAllData } from "@utils/getIndexDBData";
import { filterValueFromAudio } from "@utils/filterValueFromAudio";
import { HomePage } from "@pages/HomePage";
import IndexDB_KEYS from "@constants/indexDbKeys";
import { PageLayout } from "@components/PageLayout";
import { useAppStore } from "@store/store";
import { useSaveDataBeforeReload } from "@hooks/useSaveDataBeforeReload";

export const db = window.indexedDB;

const insertDataInIndexedDb = async () => {
  if (!db) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = db.open(IndexDB_KEYS.USER_DB, 2);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    const db = request.result;
    if (!db.objectStoreNames.contains(IndexDB_KEYS.PLAYLIST)) {
      db.createObjectStore(IndexDB_KEYS.PLAYLIST, { keyPath: "_id" });
    }
    if (!db.objectStoreNames.contains(IndexDB_KEYS.PLAYLIST_QUEUE)) {
      db.createObjectStore(IndexDB_KEYS.PLAYLIST_QUEUE, { keyPath: "queue" });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
  };
};

function App() {
  const {
    setVolume,
    setIsAudioMuted,
    setDuration,
    setPlayingSongId,
    setPlaylistSongs,
    setCurrentlyPlaying,
    setCurrrentProgress,
    setBuffered,
  } = useAppStore();

  // useSaveDataBeforeReload();

  useLayoutEffect(() => {
    (async () => {
      await insertDataInIndexedDb();
      const queueList = await getIndexDBKeyAllData(IndexDB_KEYS.PLAYLIST_QUEUE);
      if (queueList.length > 0) {
        const filterAudioData = await filterValueFromAudio(queueList[0].queueList);
        if (filterAudioData) {
          setPlaylistSongs(filterAudioData);
        }
      }
      // const localStorageSavedData = JSON.parse(localStorage.getItem("appData"));
      // if (localStorageSavedData) {
      //   const {
      //     volume,
      //     duration,
      //     isAudioMuted,
      //     currrentProgress,
      //     playingsongId,
      //     currentlyPlaying,
      //     buffered,
      //   } = localStorageSavedData;
      //   setVolume(volume);
      //   setIsAudioMuted(isAudioMuted);
      //   setDuration(duration);
      //   setPlayingSongId(playingsongId);
      //   setCurrentlyPlaying(currentlyPlaying);
      //   setCurrrentProgress(currrentProgress);
      //   setBuffered(buffered);
      // }
    })();
  }, []);

  return (
    <PageLayout>
      <HomePage />
    </PageLayout>
  );
}

export default App;
