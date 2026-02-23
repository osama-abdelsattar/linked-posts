// HeroUI
import { Avatar } from "@heroui/react";

export default function UserAvatar(props) {
  return (
    <Avatar
      {...props}
      classNames={{
        base: "bg-sky-50 dark:bg-slate-600 ring-slate-300 dark:ring-slate-600 ring-offset-sky-100 dark:ring-offset-slate-800 transition-colors",
        icon: "text-slate-500 dark:text-slate-400 transition-colors",
      }}
    />
  );
}
