import IndexDB_KEYS from "@constants/indexDbKeys";
import { db } from "App";

export const getIndexDBKeyAllData = <T>(key: string): Promise<T[]> =>
  new Promise((resolve, reject) => {
    let dbValue: T[];
    const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);
    dbPromise.onsuccess = () => {
      const dbResult = dbPromise.result;

      const tx = dbResult.transaction(key, "readonly");
      const userData = tx.objectStore(key);
      const users = userData.getAll();

      users.onsuccess = (e) => {
        // @ts-expect-error result is not showing
        dbValue = [...e.target.result];
      };

      tx.oncomplete = function () {
        dbResult.close();
        resolve(dbValue);
      };

      tx.onerror = reject;
    };
  });

export const getIndividualIndexDBData = <T>(key: string, uniqueID: string): Promise<T> =>
  new Promise((resolve, reject) => {
    let dbValue: T;
    const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);
    dbPromise.onsuccess = () => {
      const dbResult = dbPromise.result;
      const tx = dbResult.transaction(key, "readonly");
      const userData = tx.objectStore(key);
      const users = userData.get(uniqueID);

      users.onsuccess = (e) => {
        // @ts-expect-error result is not showing
        dbValue = e.target?.result;
      };

      tx.oncomplete = function () {
        dbResult.close();
        resolve(dbValue);
      };

      tx.onerror = reject;
    };
  });
