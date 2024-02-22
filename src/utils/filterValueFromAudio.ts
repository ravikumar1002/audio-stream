import IndexDB_KEYS from "@constants/indexDbKeys";
import { getIndividualIndexDBData } from "./getIndexDBData";
import { IPlaylistSongData } from "@components/AudioPlayer";

interface IFilterValueFromAudio {
  _id: string;
  name: string;
  size: number | string;
  duration: number;
}

export const filterValueFromAudio = async (
  queueList: string[],
): Promise<IFilterValueFromAudio[]> => {
  try {
    const filterValue: IFilterValueFromAudio[] = [];

    for (const item of queueList) {
      try {
        const data = await getIndividualIndexDBData<IPlaylistSongData>(IndexDB_KEYS.PLAYLIST, item);
        const rePatternData: IFilterValueFromAudio = {
          _id: data._id,
          name: data.name.split(".mp")[0],
          size: data.size,
          duration: data.duration,
        };
        filterValue.push(rePatternData);
      } catch (error) {
        console.error(`Error fetching data for item ${item}:`, error);
      }
    }

    return filterValue;
  } catch (error) {
    console.error("Error in filterValueFromAudio:", error);
    throw error;
  }
};
