import IndexDB_KEYS from "constants/indexDbKeys";
import { getIndexDBKeyAllData, getIndividualIndexDBData } from "./getIndexDBData";

// export const filterValueFromAudio = async (queueList) =>
//   new Promise((resolve, reject) => {
//     const filterValue = [];
//     queueList.map(async (item) => {
//       const data = await getIndividualIndexDBData(IndexDB_KEYS.PLAYLIST, item);
//       filterValue.push(data);
//     });
//     resolve(filterValue);
//   });

export const filterValueFromAudio = async (queueList) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filterValue = [];
      for (const item of queueList) {
        const data = await getIndividualIndexDBData(IndexDB_KEYS.PLAYLIST, item);
        const rePatternData = {
          _id: data._id,
          name: data.name,
          size: data.size,
        };
        filterValue.push(rePatternData);
      }
      resolve(filterValue);
    } catch (error) {
      reject(error);
    }
  });
};
