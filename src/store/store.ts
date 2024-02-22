import { IAudioPlayerDataDTO } from "@dto/audioPlayerDataDto";
import { IPlaylistSongCardDTO } from "@dto/playlistDTO";
import { create } from "zustand";

interface IStore {
  isPlaying: boolean;
  volume: number;
  duration: number;
  currrentProgress: number;
  isAudioMuted: boolean;
  playingsongId: string | null;
  playlistSongs: IPlaylistSongCardDTO[];
  currentlyPlaying: IAudioPlayerDataDTO | null;
  deletingStatusAlert: boolean;
  addingStatusAlert: boolean;
  setVolume: (volume: number) => void;
  setDuration: (duration: number) => void;
  setIsAudioMuted: (isAudioMuted: boolean) => void;
  setPlayingSongId: (playingsongId: string | null) => void;
  setPlaylistSongs: (playlistSongs: IPlaylistSongCardDTO[]) => void;
  setCurrentlyPlaying: (currentlyPlaying: IAudioPlayerDataDTO) => void;
  setCurrrentProgress: (currrentProgress: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setDeletingStatusAlert: (deletingStatusAlert: boolean) => void;
  setAddingStatusAlert: (addingStatusAlert: boolean) => void;
}

export const useAppStore = create<IStore>()((set) => ({
  isPlaying: false,
  volume: 0.8,
  duration: 0,
  isAudioMuted: false,
  currrentProgress: 0,
  playingsongId: null,
  playlistSongs: [],
  currentlyPlaying: null,
  deletingStatusAlert: false,
  addingStatusAlert: false,
  setVolume: (volume: number) => set({ volume: volume }),
  setIsAudioMuted: (isAudioMuted: boolean) => set({ isAudioMuted }),
  setDuration: (duration: number) => set({ duration }),
  setPlayingSongId: (playingsongId: string | null) => set({ playingsongId }),
  setPlaylistSongs: (playlistSongs: IPlaylistSongCardDTO[]) => set({ playlistSongs }),
  setCurrentlyPlaying: (currentlyPlaying: IAudioPlayerDataDTO | null) => set({ currentlyPlaying }),
  setCurrrentProgress: (currrentProgress: number) => set({ currrentProgress }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setDeletingStatusAlert: (deletingStatusAlert: boolean) => set({ deletingStatusAlert }),
  setAddingStatusAlert: (addingStatusAlert: boolean) => set({ addingStatusAlert }),
}));
