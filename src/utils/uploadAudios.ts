import IndexDB_KEYS from "constants/indexDbKeys";
import { v4 as uuidv4 } from "uuid";
import { updateIndexDBData } from "./updateIndexDBData";
import { getIndexDBKeyAllData } from "./getIndexDBData";

// const getDuration = (file) => {
//   let duration;
//   const reader = new FileReader();
//   reader.onload = function (event) {
//     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     audioContext.decodeAudioData(event.target.result, function (buffer) {
//       duration = buffer.duration;
//     });
//   };

//   reader.onerror = function (event) {
//     console.error("An error ocurred reading the file: ", event);
//   };

//   reader.readAsArrayBuffer(file);
//   return duration;
// };

export const uploadAudios = async (selectedAudios: FileList) => {
  for (const file of selectedAudios) {
    const { name, type, size } = file;
    const fileURL = URL.createObjectURL(file);
    const _id = uuidv4();
    const fileInfo = {
      _id,
      name,
      type,
      size,
      fileURL,
    };

    const queueList = await getIndexDBKeyAllData(IndexDB_KEYS.PLAYLIST_QUEUE);
    console.log(queueList);
    const queueListMerge = queueList.length > 0 ? [...queueList[0].queueList, _id] : [_id];
    updateIndexDBData(
      [IndexDB_KEYS.PLAYLIST, IndexDB_KEYS.PLAYLIST_QUEUE],
      [
        fileInfo,
        {
          queue: "queue",
          queueList: queueListMerge,
        },
      ],
    );
  }
};
