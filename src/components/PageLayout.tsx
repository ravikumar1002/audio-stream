import { Header } from "./Header";
import "./page-layout.css";
interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout = (props: IPageLayout) => {
  const { children } = props;

  return (
    <div className="h-screen grid grid-rows-9 sm:grid-rows-10" style={{ minHeight: "500px" }}>
      <header className="header bg-white">
        <Header />
      </header>
      <main className="row-span-8 sm:row-span-9">
        <div className="grid h-full grid-rows-8">
          <div className="mx-auto w-full max-w-5xl p-6 lg:px-8 row-span-7">{children}</div>
          <div className="">Active song card</div>
        </div>
      </main>
    </div>
  );
};
