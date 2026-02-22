// React
import { Outlet } from "react-router-dom";
// Components
import Header from "./header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="mt-20 font-[inter]">
        <div className="max-w-7xl mx-auto py-12 px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
}
