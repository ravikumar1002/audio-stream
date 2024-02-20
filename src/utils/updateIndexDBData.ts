import { db } from "App";
import IndexDB_KEYS from "constants/indexDbKeys";

export const updateIndexDBData = (keys: string[], data) => {
  const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);

  dbPromise.onsuccess = () => {
    const db = dbPromise.result;

    const tx = db.transaction([...keys], "readwrite");

    for (let i = 0; i < keys.length; i++) {
      const dbData = tx.objectStore(keys[i]);
      const uploadingData = dbData.put(data[i]);
      uploadingData.onsuccess = () => {};
    }

    tx.oncomplete = function () {
      db.close();
    };
  };
};
