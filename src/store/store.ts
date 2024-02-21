import { create } from "zustand";

export interface IPlaylistSong {
  _id: string;
  name: string;
  size: number | string;
  duration: number;
}

export type ICurrentlyPlaying = Pick<IPlaylistSong, "_id" | "name" | "size" | "duration"> & {
  type: string;
  fileUrl: File;
};

interface IStore {
  volume: number;
  duration: number;
  currrentProgress: number;
  isAudioMuted: boolean;
  playingsongId: string | null;
  playlistSongs: IPlaylistSong[];
  currentlyPlaying: ICurrentlyPlaying | null;
  buffered: number;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setIsAudioMuted: (isAudioMuted: boolean) => void;
  setPlayingSongId: (playingsongId: string | null) => void;
  setPlaylistSongs: (playlistSongs: IPlaylistSong[]) => void;
  setCurrentlyPlaying: (currentlyPlaying: ICurrentlyPlaying) => void;
  setCurrrentProgress: (currrentProgress: number) => void;
  setBuffered: (currrentProgress: number) => void;
}

export const useAppStore = create<IStore>()((set) => ({
  volume: 0.8,
  duration: 0,
  isAudioMuted: false,
  currrentProgress: 0,
  playingsongId: null,
  playlistSongs: [],
  currentlyPlaying: null,
  buffered: 0,
  setVolume: (volume: number) => set({ volume: volume }),
  setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
  setDuration: (duration: number) => set({ duration }),
  setPlayingSongId: (playingsongId: string | null) => set({ playingsongId }),
  setPlaylistSongs: (playlistSongs: IPlaylistSong[]) => set({ playlistSongs }),
  setCurrentlyPlaying: (currentlyPlaying: ICurrentlyPlaying | null) => set({ currentlyPlaying }),
  setCurrrentProgress: (currrentProgress: number) => set({ currrentProgress }),
  setBuffered: (buffered: number) => set({ buffered }),
}));
