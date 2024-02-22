import IndexDB_KEYS from "@constants/indexDbKeys";
import { db } from "App";

// @ts-expect-error because sending different types of file to update, using one common function
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
