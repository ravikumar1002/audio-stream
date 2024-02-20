import IndexDB_KEYS from "@constants/indexDbKeys";
import { db } from "App";

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
        console.log(e.target.result);
        dbValue = [...e.target?.result];
      };

      tx.oncomplete = function () {
        dbResult.close();
        resolve(dbValue);
      };

      tx.onerror = reject;
    };
  });

export const getIndividualIndexDBData = (key: string, uniqueID: string) =>
  new Promise((resolve, reject) => {
    let dbValue: any;
    const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);
    dbPromise.onsuccess = () => {
      const dbResult = dbPromise.result;

      const tx = dbResult.transaction(key, "readonly");
      const userData = tx.objectStore(key);
      const users = userData.get(uniqueID);

      users.onsuccess = (e) => {
        dbValue = e.target?.result;
      };

      tx.oncomplete = function () {
        dbResult.close();
        resolve(dbValue);
      };

      tx.onerror = reject;
    };
  });
