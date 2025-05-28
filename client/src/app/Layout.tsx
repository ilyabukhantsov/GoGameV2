import Header from '../components/layout/header/Header';
import SideBar from '../components/layout/sidebar/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto px-2.5">
      <Header />
      <main className="flex">
        <SideBar />
        <section className="w-full">{children}</section>
      </main>
    </div>
  );
};

export default Layout;
