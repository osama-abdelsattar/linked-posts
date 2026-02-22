// React
import { useState } from "react";
// HeroUI
import { Switch } from "@heroui/react";
// Icons
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
  );
  return (
    <Switch
      classNames={{
        wrapper: "bg-slate-300 group-data-[selected=true]:bg-[#273463]",
      }}
      isSelected={isDark}
      onValueChange={() => {
        setIsDark(!isDark);
        if (isDark === true) {
          document.documentElement.classList.replace("dark", "light");
          localStorage.setItem("theme", "light");
        }
        if (isDark === false) {
          document.documentElement.classList.replace("light", "dark");
          localStorage.setItem("theme", "dark");
        }
      }}
      size="lg"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <IoMoon className={className} />
        ) : (
          <IoSunny className={className} />
        )
      }
    />
  );
}
