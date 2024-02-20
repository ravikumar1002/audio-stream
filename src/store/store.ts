import { create } from "zustand";

export interface IPlaylistSong {
  _id: string;
  name: string;
  size: number | string;
}

interface IStore {
  audioLevel: number;
  isAudioMuted: boolean;
  currentTrack: number;
  playingsongId: string | null;
  playlistSongs: IPlaylistSong[];
  setAudioLevel: (audioLevel: number) => void;
  setIsAudioMuted: (isAudioMuted: boolean) => void;
  setCurrentTrack: (currentTrack: number) => void;
  setPlayingSongId: (playingsongId: string | null) => void;
  setPlaylistSongs: (playlistSongs: IPlaylistSong[]) => void;
}

export const useAppStore = create<IStore>()((set) => ({
  audioLevel: 40,
  isAudioMuted: false,
  currentTrack: 0,
  playingsongId: null,
  playlistSongs: [],
  setAudioLevel: (audioLevel: number) => set({ audioLevel }),
  setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
  setCurrentTrack: (currentTrack: number) => set({ currentTrack }),
  setPlayingSongId: (playingsongId: string | null) => set({ playingsongId }),
  setPlaylistSongs: (playlistSongs: IPlaylistSong[]) => set({ playlistSongs }),
}));
