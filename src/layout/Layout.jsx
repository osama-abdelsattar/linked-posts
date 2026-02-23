// React
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// HeroUI
import { showInfoToast } from "../utils/toast";
// Icons
import { CiWifiOff } from "react-icons/ci";
import { CiWifiOn } from "react-icons/ci";
// Components
import Header from "./header/Header";
// Network
import { useIsOnline } from "../hooks/useIsOnline";
import { useIsFetching } from "@tanstack/react-query";
import ReloadSpinner from "../components/reload-spinner/ReloadSpinner";
// Motion
import { motion } from "framer-motion";

export default function Layout() {
  const isOnline = useIsOnline();
  const prevIsOnline = useRef(null);

  useEffect(() => {
    if (prevIsOnline.current === null) {
      prevIsOnline.current = isOnline;
      return;
    }
    if (!isOnline)
      showInfoToast(
        "You're offline",
        "Check your internet connection.",
        <CiWifiOff />,
      );
    else
      showInfoToast(
        "You're back online",
        "Internet connection restored.",
        <CiWifiOn />,
      );
  }, [isOnline]);
  const isFetching = useIsFetching();

  return (
    <motion.div
      children={[
        <Header key="header" />,
        isFetching > 0 && <ReloadSpinner key="spinner" />,
        <main key="main" className="font-[inter] min-h-[calc(100vh-5rem)]">
          <div className="max-w-7xl mx-auto sm:py-6 lg:py-12 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>,
      ]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    />
  );
}
