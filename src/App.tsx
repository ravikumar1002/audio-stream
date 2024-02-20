import { HomePage } from "pages/HomePage";
import "./App.css";
import { PageLayout } from "./components/PageLayout";
import { useSaveDataBeforeReload } from "hooks/useSaveDataBeforeReload";
import { useEffect, useLayoutEffect } from "react";
import { useAppStore } from "store/store";
import IndexDB_KEYS from "constants/indexDbKeys";
import { getIndexDBKeyAllData } from "@utils/getIndexDBData";
import { filterValueFromAudio } from "@utils/filterValueFromAudio";

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
    console.log(event);
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
  useLayoutEffect(() => {
    console.log("A");
    (async () => {
      await insertDataInIndexedDb();
      const queueList = await getIndexDBKeyAllData(IndexDB_KEYS.PLAYLIST_QUEUE);
      // const playlist = await getIndexDBKeyAllData(IndexDB_KEYS.PLAYLIST);
      console.log(queueList);
      if (queueList.length > 0) {
        const filterAudioData = await filterValueFromAudio(queueList[0].queueList);
        console.log(filterAudioData);
      }
    })();
  }, []);

  // useEffect(() => {
  //   insertDataInIndexedDb();
  // }, []);

  return (
    <PageLayout>
      <HomePage />
    </PageLayout>
  );
}

export default App;
