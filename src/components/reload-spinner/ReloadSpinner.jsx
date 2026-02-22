// HeroUI
import { Spinner } from "@heroui/react";

export default function ReloadSpinner() {
  return (
    <Spinner
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
      classNames={{
        base: "bg-sky-200/60 dark:bg-slate-900/50 backdrop-blur-lg p-1.5 rounded-full transition-colors",
      }}
      variant="gradient"
    />
  );
}
