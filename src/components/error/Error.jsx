// React
import { useNavigate } from "react-router-dom";
// HeroUI
import { Button } from "@heroui/react";
// Icons
import { FaAngleLeft, FaHouse, FaRotateRight } from "react-icons/fa6";
// Components
import Header from "../../layout/header/Header";
// Error
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
// Motion
import { motion } from "framer-motion";

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500,
    title = status === 404 ? "Page Not Found" : "Something Went Wrong",
    message =
      status === 404
        ? "The page you're looking for doesn't exist or has been removed."
        : "An unexpected error occurred. Please try again later.";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      children={[
        <Header key="navbar" />,
        <main
          key="mainContent"
          className="font-[inter] min-h-[calc(100vh-(20*0.25rem))] bg-sky-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 flex flex-col justify-center items-center overflow-hidden"
        >
          <div className="bg-sky-50 dark:bg-slate-800 w-full sm:w-fit max-w-4xl mx-auto sm:rounded-2xl flex flex-col gap-12 items-center px-12 py-8 animate-[appearance-in_0.3s_0.3s]">
            <div className="w-full h-2 rounded-lg bg-linear-to-r from-sky-500 to-teal-500 dark:from-sky-600 dark:to-teal-600" />
            <div className="max-w-xl text-center">
              <div className="text-8xl font-black bg-linear-to-br from-sky-400 to-teal-400 dark:from-sky-500/80 dark:to-teal-500/80 bg-clip-text text-transparent tracking-tighter mb-2 animate-pulse">
                {status}
              </div>
              <h1 className="text-2xl font-bold mb-1">{title}</h1>
              <p className="text-slate-500">{message}</p>
            </div>
            <div className="flex gap-4 justify-center">
              {status === 404 ? (
                <>
                  <Button
                    onPress={() => navigate("/")}
                    className="bg-sky-500 dark:bg-sky-400/50 text-sky-50"
                    startContent={<FaHouse />}
                  >
                    Go Home
                  </Button>
                  <Button
                    onPress={() => navigate(-1)}
                    variant="ghost"
                    className="bg-sky-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-500 data-[hover=true]:bg-slate-300! dark:data-[hover=true]:bg-slate-800!"
                    startContent={<FaAngleLeft />}
                  >
                    Go Back
                  </Button>
                </>
              ) : (
                <Button
                  onPress={() => location.reload()}
                  variant="ghost"
                  className="bg-sky-50 dark:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-500 data-[hover=true]:bg-slate-300! dark:data-[hover=true]:bg-slate-800!"
                  startContent={<FaRotateRight />}
                >
                  Refresh
                </Button>
              )}
            </div>
          </div>
        </main>,
      ]}
    />
  );
}
