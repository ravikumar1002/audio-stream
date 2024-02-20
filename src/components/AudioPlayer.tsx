import { SongController } from "./SongController";
import { VolumeController } from "./VolumeController";

export const AudioPlayer = ({ title }: { title: string }) => {
  return (
    <div className="bg-gray-200 h-full">
      <div className="flex justify-between py-3 px-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <SongController />
        </div>
        <div className="flex-grow text-center">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex items-center justify-end">
          <VolumeController />
        </div>
      </div>
    </div>
  );
};
