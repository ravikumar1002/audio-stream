export const Header = () => {
  return (
    <div>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div>
          <div className="-m-1.5 p-1.5 flex items-center gap-1">
            <img
              className="h-8 w-auto"
              src="https://static.vecteezy.com/system/resources/previews/026/991/817/original/3d-streaming-music-online-icon-for-ui-ux-web-mobile-apps-social-media-ads-design-free-png.png"
              alt=""
            />
            <span>Audio Stream</span>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
            <span className="text-base leading-normal">Upload songs</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <input type="file" name="" id="" className="hidden" />
          </label>
        </div>
      </nav>
    </div>
  );
};
