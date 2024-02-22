import IndexDB_KEYS from "@constants/indexDbKeys";
import { getIndividualIndexDBData } from "./getIndexDBData";
import { IPlaylistSongCardDTO } from "@dto/playlistDTO";
import { IAudioPlayerDataDTO } from "@dto/audioPlayerDataDto";

export const filterValueFromAudio = async (
  queueList: string[],
): Promise<IPlaylistSongCardDTO[]> => {
  try {
    const filterValue: IPlaylistSongCardDTO[] = [];

    for (const item of queueList) {
      try {
        const data = await getIndividualIndexDBData<IAudioPlayerDataDTO>(
          IndexDB_KEYS.PLAYLIST,
          item,
        );
        const rePatternData: IPlaylistSongCardDTO = {
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
