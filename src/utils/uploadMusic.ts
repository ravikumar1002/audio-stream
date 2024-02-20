import { v4 as uuidv4 } from "uuid";

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

interface ISongDetails {
  _id: string;
  name: string;
  type: string;
  size: string | number;
  fileURL: string;
}

const saveInLocalStroge = (songDetails: ISongDetails[]) => {
  console.log(songDetails);
  const getLocalStroagePlaylist = localStorage.getItem("playlist");
  const localStoragePlaylist = JSON.parse(getLocalStroagePlaylist ? getLocalStroagePlaylist : "");
  let reArrangeData;
  if (localStoragePlaylist && localStoragePlaylist?.playlist) {
    reArrangeData = [...localStoragePlaylist.playlist, ...songDetails];
  } else {
    reArrangeData = [...songDetails];
  }

  localStorage.setItem(
    "playlist",
    JSON.stringify({
      playlist: reArrangeData,
    }),
  );
};

export const uploadMusic = (selectedSongs: FileList) => {
  const dataArrange = [];
  for (const file of selectedSongs) {
    const name = file.name ? file.name : "NOT SUPPORTED";
    const type = file.type ? file.type : "NOT SUPPORTED";
    const size = file.size ? file.size : "NOT SUPPORTED";
    const fileURL = URL.createObjectURL(file);
    const _id = uuidv4();
    // const duration = async () => {
    //   return await getDuration(file);
    // };
    console.log(_id);
    const fileInfo = {
      _id,
      name,
      type,
      size,
      fileURL,
    };
    dataArrange.push(fileInfo);
    console.log(`name: ${name}, type: ${type}, size: ${size}`);
    // console.log(duration);
  }
  console.log(dataArrange);
  saveInLocalStroge(dataArrange);
};
