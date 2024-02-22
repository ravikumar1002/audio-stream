import { v4 as uuidv4 } from "uuid";
import { updateIndexDBData } from "./updateIndexDBData";
import { getIndexDBKeyAllData } from "./getIndexDBData";
import IndexDB_KEYS from "@constants/indexDbKeys";

interface IQueueIndexDBData {
  queue: string;
  queueList: string[];
}

const getDuration = (file: File): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      // @ts-expect-error beacuse of event
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target!.result as ArrayBuffer, (buffer) => {
        resolve(buffer.duration);
      });
    };

    reader.onerror = (event) => {
      console.error("An error ocurred reading the file: ", event);
      // @ts-expect-error same thing happing here
      reject(event.error);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const uploadAudios = async (selectedAudios: FileList) => {
  for (let i = 0; i < selectedAudios.length; i++) {
    const file = selectedAudios[i];
    const { name, type, size } = file;
    const _id = uuidv4();
    const duration = await getDuration(file);
    const fileUrl = new Blob([selectedAudios[i]], { type: "audio/mpeg" });

    const fileInfo = {
      _id,
      name,
      type,
      size,
      fileUrl,
      duration: Math.round(duration),
    };
    if (file.type === "audio/mpeg") {
      const queueList = await getIndexDBKeyAllData<IQueueIndexDBData>(IndexDB_KEYS.PLAYLIST_QUEUE);
      const queueListMerge = queueList.length > 0 ? [...queueList[0].queueList, _id] : [_id];
      updateIndexDBData(
        [IndexDB_KEYS.PLAYLIST, IndexDB_KEYS.PLAYLIST_QUEUE],
        [fileInfo, { queue: "queue", queueList: queueListMerge }],
        "Audio Added",
      );
    }
  }
};
