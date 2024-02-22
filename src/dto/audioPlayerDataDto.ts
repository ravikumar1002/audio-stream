export interface IAudioPlayerDataDTO {
  duration: number;
  fileUrl: Blob | File;
  name: string;
  size: number;
  type: string;
  _id: string;
}
