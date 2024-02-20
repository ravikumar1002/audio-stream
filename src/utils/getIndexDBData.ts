import { db } from "App";
import IndexDB_KEYS from "constants/indexDbKeys";

export const getIndexDBKeyAllData = (key: string) =>
  new Promise((resolve, reject) => {
    let dbValue: any;
    const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);
    dbPromise.onsuccess = () => {
      const dbResult = dbPromise.result;

      const tx = dbResult.transaction(key, "readonly");
      const userData = tx.objectStore(key);
      const users = userData.getAll();

      users.onsuccess = (e) => {
        dbValue = [...e.target?.result];
      };

      tx.oncomplete = function () {
        dbResult.close();
        resolve(dbValue);
      };

      tx.onerror = reject;
    };
  });
