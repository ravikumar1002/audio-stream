import { SongController } from "./SongController";
import { VolumeController } from "./VolumeController";

export const AudioPlayer = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="flex justify-between py-3 px-6">
        <div>
          <SongController />
        </div>
        <div>
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </div>
        <div>
          <VolumeController />
        </div>
      </div>
    </div>
  );
};
