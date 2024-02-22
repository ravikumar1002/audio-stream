import { filterValueFromAudio } from "@utils/filterValueFromAudio";
import { getIndexDBKeyAllData } from "@utils/getIndexDBData";
import { updateIndexDBData } from "@utils/updateIndexDBData";
import { db } from "App";
import IndexDB_KEYS from "@constants/indexDbKeys";
import { IIndexDBQueueDataDTO } from "@dto/indexDbQueueDTO";
import { useAppStore } from "@store/store";

export const useDeleteAudioFRomIndexDB = () => {
  const { setPlaylistSongs, playingsongId, setPlayingSongId } = useAppStore();

  const deleteAudioFromDb = (_id: string) => {
    const dbPromise = db.open(IndexDB_KEYS.USER_DB, 2);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;
      const tx = db.transaction(IndexDB_KEYS.PLAYLIST, "readwrite");
      const userData = tx.objectStore(IndexDB_KEYS.PLAYLIST);
      userData.delete(_id);

      const queue = db.transaction(IndexDB_KEYS.PLAYLIST_QUEUE, "readwrite");
      const queueList = queue.objectStore(IndexDB_KEYS.PLAYLIST_QUEUE);
      const deleteUserQueue = queueList.delete(_id);

      deleteUserQueue.onsuccess = () => {
        (async () => {
          const prevQueueList = await getIndexDBKeyAllData<IIndexDBQueueDataDTO>(
            IndexDB_KEYS.PLAYLIST_QUEUE,
          );
          const removingDeletedId = prevQueueList[0].queueList.filter((item) =>
            item === _id ? false : true,
          );
          updateIndexDBData(
            [IndexDB_KEYS.PLAYLIST_QUEUE],
            [{ queue: "queue", queueList: removingDeletedId }],
            "Audio Deleted",
          );
          const queueList = await getIndexDBKeyAllData<IIndexDBQueueDataDTO>(
            IndexDB_KEYS.PLAYLIST_QUEUE,
          );
          if (queueList.length > 0) {
            const filterAudioData = await filterValueFromAudio(queueList[0].queueList);
            if (filterAudioData) {
              setPlaylistSongs(filterAudioData);
            }
          }
          if (playingsongId === _id) {
            setPlayingSongId(null);
          }
        })();
      };

      tx.oncomplete = function () {
        db.close();
      };
      queue.oncomplete = function () {
        db.close();
      };
    };
  };

  return { deleteAudioFromDb };
};
