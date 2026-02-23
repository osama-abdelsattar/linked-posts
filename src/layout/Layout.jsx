// React
import { Outlet } from "react-router-dom";
// Components
import Header from "./header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="font-[inter]">
        <div className="max-w-7xl mx-auto sm:py-6 lg:py-12 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
