import { IPlaylistSongCardDTO } from "@dto/playlistDTO";
import { create } from "zustand";

export type ICurrentlyPlaying = Pick<IPlaylistSongCardDTO, "_id" | "name" | "size" | "duration"> & {
  type: string;
  fileUrl: Blob | File;
};

interface IStore {
  volume: number;
  duration: number;
  currrentProgress: number;
  isAudioMuted: boolean;
  playingsongId: string | null;
  playlistSongs: IPlaylistSongCardDTO[];
  currentlyPlaying: ICurrentlyPlaying | null;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setIsAudioMuted: (isAudioMuted: boolean) => void;
  setPlayingSongId: (playingsongId: string | null) => void;
  setPlaylistSongs: (playlistSongs: IPlaylistSongCardDTO[]) => void;
  setCurrentlyPlaying: (currentlyPlaying: ICurrentlyPlaying) => void;
  setCurrrentProgress: (currrentProgress: number) => void;
}

export const useAppStore = create<IStore>()((set) => ({
  volume: 0.8,
  duration: 0,
  isAudioMuted: false,
  currrentProgress: 0,
  playingsongId: null,
  playlistSongs: [],
  currentlyPlaying: null,
  setVolume: (volume: number) => set({ volume: volume }),
  setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
  setDuration: (duration: number) => set({ duration }),
  setPlayingSongId: (playingsongId: string | null) => set({ playingsongId }),
  setPlaylistSongs: (playlistSongs: IPlaylistSongCardDTO[]) => set({ playlistSongs }),
  setCurrentlyPlaying: (currentlyPlaying: ICurrentlyPlaying | null) => set({ currentlyPlaying }),
  setCurrrentProgress: (currrentProgress: number) => set({ currrentProgress }),
}));
