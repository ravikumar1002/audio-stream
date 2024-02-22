import { useAppStore } from "@store/store";
import { AudioPlayer } from "./AudioPlayer";
import { Header } from "./Header";
import "./page-layout.css";

interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout = (props: IPageLayout) => {
  const { children } = props;
  const { playingsongId } = useAppStore();

  return (
    <div
      className="h-screen grid grid-rows-9 sm:grid-rows-10"
      style={{ minHeight: "500px", height: "100dvh" }}
    >
      <header className="header h-full bg-white">
        <Header />
      </header>
      <main className="row-span-8 sm:row-span-9">
        <div className={`grid h-full grid-rows-7 sm:row-span-8`}>
          <div
            className={`mx-auto w-full max-w-5xl p-6 lg:px-8 ${
              playingsongId ? "row-span-6  sm:row-span-7" : "row-span-7  sm:row-span-8"
            } overflow-auto`}
          >
            {children}
          </div>
          <div className="mx-auto w-full max-w-5xl lg:px-8 relative">
            {playingsongId && <AudioPlayer key={playingsongId} />}
          </div>
        </div>
      </main>
    </div>
  );
};
