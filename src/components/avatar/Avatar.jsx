// HeroUI
import { Avatar } from "@heroui/react";

export default function UserAvatar(props) {
  return (
    <Avatar
      {...props}
      classNames={{
        base: "bg-slate-200 dark:bg-slate-600 transition-colors",
        icon: "text-slate-500 dark:text-slate-400 transition-colors size-10",
      }}
    />
  );
}
