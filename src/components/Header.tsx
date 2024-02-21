import { uploadAudios } from "@utils/uploadAudios";

export const Header = () => {
  
  const handleFileUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadAudios(e.target.files);
    }
  };

  return (
    <div>
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8 max-w-7xl"
        aria-label="Global"
      >
        <div className="-m-1.5 p-1.5 flex items-center gap-2">
          <img
            className="h-8 w-auto"
            src="https://static.vecteezy.com/system/resources/previews/026/991/817/original/3d-streaming-music-online-icon-for-ui-ux-web-mobile-apps-social-media-ads-design-free-png.png"
            alt="Audio Stream"
          />
          <span className="text-xl font-semibold">Audio Stream</span>
        </div>

        <div>
          <label
            htmlFor="upload-mp3"
            className="flex items-center gap-2 text-sm font-semibold text-gray-900 cursor-pointer"
          >
            <span>Upload songs</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <input
              type="file"
              id="upload-mp3"
              className="hidden"
              multiple
              accept=".mp3,audio/*"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </nav>
    </div>
  );
};
