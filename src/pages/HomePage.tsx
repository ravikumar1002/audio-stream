export const HomePage = () => {
  return (
    <div>
      <p>Home page</p>
      <button
        onClick={() => {
          const getLocalStroagePlaylist = localStorage.getItem("playlist");

          if (getLocalStroagePlaylist) {
            const localStoragePlaylist = new Map(JSON.parse(getLocalStroagePlaylist));
            console.log(Array.from(localStoragePlaylist.values()));
          }
        }}
      >
        show console
      </button>
    </div>
  );
};
