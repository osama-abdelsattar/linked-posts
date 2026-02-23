// React
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// Caching
import { useQueryClient } from "@tanstack/react-query";
// HeroUI
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
// Style
// Icons
import { PiHouseBold, PiGearBold } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbNotification } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
// Components
import UserAvatar from "../../components/avatar/Avatar";
import { showSuccessToast } from "../../utils/toast";

export default function Header() {
  const { setToken } = useContext(authContext);
  const { userData } = useContext(profileContext);
  const dataQueries = useQueryClient();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuBtns = [
    {
      icon: <PiHouseBold className="size-6" />,
      text: "Home",
      destination: "/",
    },
    {
      icon: <FaRegCircleUser className="size-6" />,
      text: "Profile",
      destination: "/profile",
    },
    {
      icon: <TbNotification className="size-6" />,
      text: "Notifications",
      destination: "/notifications",
    },
    {
      icon: <PiGearBold className="size-6" />,
      text: "Settings",
      destination: "/settings",
    },
  ];
  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-sky-50/80 dark:bg-slate-800/90 transition-colors"
      height="5rem"
      maxWidth="xl"
    >
      {/* Menu button in phone screens */}
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          className="cursor-pointer"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      {/* Logo in phone screens */}
      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <div className="font-[DM_Serif_Text] font-bold text-2xl lg:text-3xl bg-linear-to-l from-sky-600/80 dark:from-sky-500/80 to-sky-600/90 transition-colors text-transparent bg-clip-text grow">
            <Link to="/">Linked Posts</Link>
          </div>
        </NavbarBrand>
      </NavbarContent>
      {/* Logo in larger screens */}
      <NavbarContent className="hidden md:flex" justify="start">
        <NavbarBrand>
          <div className="font-[DM_Serif_Text] font-bold text-2xl lg:text-3xl bg-linear-to-l from-sky-600/80 dark:from-sky-500/80 to-sky-600/90 transition-colors text-transparent bg-clip-text grow">
            <Link to="/">Linked Posts</Link>
          </div>
        </NavbarBrand>
      </NavbarContent>
      {/* Nav in larger screens */}
      <NavbarContent className="hidden md:flex gap-6" justify="center">
        <NavbarItem>
          <NavLink
            onClick={(e) => {
              if (e.currentTarget.classList.contains("active"))
                dataQueries.invalidateQueries(["Posts"]);
            }}
            className="nav-link"
            to="/"
            title="Home"
          >
            <PiHouseBold className="size-6.5" />
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            onClick={(e) => {
              if (e.currentTarget.classList.contains("active"))
                dataQueries.invalidateQueries(["MyPosts"]);
            }}
            className="nav-link"
            to="/profile"
            title="Profile"
          >
            <FaRegCircleUser className="size-6" />
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            className="nav-link"
            to="/notifications"
            title="Notifications"
          >
            <TbNotification className="size-7" />
          </NavLink>
        </NavbarItem>
      </NavbarContent>
      {/* Avatar menu */}
      <NavbarContent as="div" justify="end">
        <Dropdown
          classNames={{ content: "bg-sky-50 dark:bg-slate-800" }}
          placement="bottom-end"
          backdrop="blur"
        >
          <DropdownTrigger>
            <UserAvatar
              as="button"
              className="cursor-pointer"
              src={userData?.user.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
              <DropdownItem
                classNames={{
                  base: "data-[hover=true]:bg-sky-100 dark:data-[hover=true]:bg-slate-700/60 dark:data-[hover=true]:text-sky-100",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                as={Link}
                to="/profile"
                key="profile"
                className="h-14 gap-2"
                aria-label="Profile"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar size="sm" isBordered src={userData?.user.photo} />
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Signed in as
                    </p>
                    <p className="font-semibold">{userData?.user.name}</p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                classNames={{
                  base: "data-[hover=true]:bg-sky-100 dark:data-[hover=true]:bg-slate-700/60 dark:data-[hover=true]:text-sky-100",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                as={Link}
                to="/settings"
                key="settings"
                startContent={<PiGearBold />}
              >
                Settings
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              onClick={() => {
                setIsMenuOpen(false);
              }}
              key="logout"
              color="danger"
              className="text-danger"
              startContent={<MdLogout />}
              onPress={() => {
                showSuccessToast("Logged out, redirecting to login page.");
                setToken(null);
                localStorage.removeItem("token");
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      {/* Phone screens menu */}
      <NavbarMenu
        motionProps={{
          initial: { x: "-100%", opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "-100%", opacity: 0 },
          transition: { duration: 0.5, ease: "backInOut" },
        }}
        className="bg-sky-50/80 backdrop-blur-xl inset-x-0 backdrop-saturate-150 dark:bg-slate-800 overflow-hidden pt-0 pb-6 px-4 h-[calc(100dvh-5rem)] justify-between shadow"
      >
        <div className="grid grid-cols-2 gap-4">
          {menuBtns.map(({ icon, text, destination }) => (
            <NavbarMenuItem key={text}>
              <Link
                className="block p-4 bg-sky-100/60 hover:bg-sky-200/60 text-slate-500 hover:text-sky-600 border-[3px] border-sky-200/70 hover:border-sky-200 dark:bg-slate-700/60 dark:hover:bg-sky-900/50 dark:border-slate-600 dark:text-slate-400 dark:hover:text-sky-600 dark:hover:border-sky-600/40 transition-colors rounded-xl"
                to={destination}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                {icon}
                <span className="text-base font-medium">{text}</span>
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <NavbarMenuItem className="col-span-2">
          <Button
            className="w-full bg-danger-50/80 text-rose-400 border-2 border-danger-200/70 data-[hover=true]:border-danger dark:bg-transparent dark:text-danger dark:border-danger py-5"
            color="danger"
            variant="ghost"
            onPress={() => {
              showSuccessToast("Logged out, redirecting to login page.");
              setToken(null);
              localStorage.removeItem("token");
            }}
          >
            <MdLogout className="size-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
