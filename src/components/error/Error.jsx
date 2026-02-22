// React
import { useNavigate } from "react-router-dom";
// HeroUI
import { Button } from "@heroui/react";
// Icons
import { FaAngleLeft, FaHouse } from "react-icons/fa6";
// Components
import Header from "../../layout/header/Header";

export default function Error() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="mt-20 font-[inter] min-h-[calc(100vh-(20*0.25rem))] bg-sky-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col justify-center items-center">
        <div className="bg-sky-50 dark:bg-slate-800 max-w-4xl mx-auto rounded-lg flex flex-col gap-12 items-center px-12 py-8 animate-appearance-in">
          <div className="w-full h-2 rounded-lg bg-linear-to-r from-sky-500 to-teal-500 dark:from-sky-600 dark:to-teal-600" />
          <div className="max-w-xl text-center">
            <div className="text-8xl font-black bg-linear-to-br from-sky-400 to-teal-400 dark:from-sky-500/80 dark:to-teal-500/80 bg-clip-text text-transparent tracking-tighter mb-2 animate-pulse">
              404
            </div>
            <h1 className="text-2xl font-bold mb-1">Page Not Found</h1>
            <p className="text-slate-500">
              The page you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button
              onPress={() => navigate("/")}
              className="bg-sky-500 dark:bg-sky-400/50 text-sky-50"
              startContent={<FaHouse />}
            >
              Go Home
            </Button>
            <Button
              onPress={() => history.back()}
              variant="ghost"
              className="bg-sky-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-500 data-[hover=true]:bg-slate-300! dark:data-[hover=true]:bg-slate-800!"
              startContent={<FaAngleLeft />}
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
