// React
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// HeroUI
import { showSuccessToast, showErrorToast } from "../utils/toast";
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
    if (!isOnline) {
      showErrorToast("You're offline", "Check your internet connection.");
    } else {
      showSuccessToast("You're back online", "Internet connection restored.");
    }
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
