import { onlineManager } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";

onlineManager.setEventListener((setOnline) => {
  const onOnline = () => setOnline(true);
  const onOffline = () => setOnline(false);

  setOnline(navigator.onLine);

  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
});

export async function checkConnectivity() {
  try {
    await fetch(`/api/ping?_=${Date.now()}`, {
      method: "HEAD",
      cache: "no-store",
    });
    onlineManager.setOnline(true);
  } catch {
    onlineManager.setOnline(false);
  }
}
export function useIsOnline() {
  return useSyncExternalStore(
    onlineManager.subscribe,
    () => onlineManager.isOnline(),
    () => true,
  );
}
