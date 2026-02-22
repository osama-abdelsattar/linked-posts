// React
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// Caching
import { useQueryClient } from "@tanstack/react-query";
// HeroUI
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  User,
} from "@heroui/react";
// Style
import "./Header.css";
// Icons
import { PiHouseBold, PiGearBold } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbNotification } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
// Components
import UserAvatar from "../../components/avatar/Avatar";
import { IoIosCheckmarkCircle } from "react-icons/io";

export default function Header() {
  const { setToken } = useContext(authContext);
  const { userData } = useContext(profileContext);
  const dataQueries = useQueryClient();
  const menuInputRef = useRef(null);
  const navigate = useNavigate();
  return (
    <header className="fixed z-50 top-0 left-0 right-0 bg-sky-100/90 shadow-lg shadow-slate-900/10 dark:bg-slate-800/85 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto flex items-center h-20 py-4 px-6">
        <div className="font-[DM_Serif_Text] font-bold text-3xl bg-linear-to-l from-sky-600/80 dark:from-sky-500/80 to-sky-600/90 transition-colors text-transparent bg-clip-text grow">
          Linked Posts
        </div>
        <input
          ref={menuInputRef}
          className="peer hidden"
          type="checkbox"
          id="menu-btn"
        />
        <div className="menu peer-checked:translate-x-0 peer-checked:opacity-100 flex lg:items-center justify-between grow">
          <div className="hidden lg:flex lg:items-center order-3 lg:order-1 lg:ms-auto gap-4">
            <Dropdown className="bg-sky-100 dark:bg-slate-800">
              <DropdownTrigger>
                <Button
                  variant="flat"
                  isIconOnly
                  className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10 p-1.5 rounded-full w-auto h-auto"
                >
                  <UserAvatar
                    src={userData?.data.data.user.photo}
                    className="size-9"
                    classNames={{
                      base: "bg-slate-200 dark:bg-slate-600 transition-colors",
                      icon: "text-slate-500 dark:text-slate-400 transition-colors",
                    }}
                  />
                  <BsThreeDotsVertical className="ms-1 text-xl" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  as={Link}
                  key="profile"
                  classNames={{
                    base: "data-[hover=true]:bg-sky-200 dark:data-[hover=true]:bg-slate-700",
                  }}
                  aria-label="Profile"
                  to="/profile"
                  showDivider
                >
                  <User
                    avatarProps={{
                      src: userData?.data.data.user.photo,
                      classNames: {
                        base: "bg-slate-200 dark:bg-slate-600 transition-colors",
                        icon: "text-slate-500 dark:text-slate-400 transition-colors",
                      },
                    }}
                    name={userData?.data.data.user.name}
                    description="Go to profile"
                  />
                </DropdownItem>
                <DropdownSection>
                  <DropdownItem
                    as={Link}
                    classNames={{
                      base: "data-[hover=true]:bg-sky-200 dark:data-[hover=true]:bg-slate-700",
                    }}
                    key="settings"
                    startContent={<PiGearBold />}
                    to="/settings"
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    startContent={<MdLogout />}
                    color="danger"
                    onClick={() => {
                      addToast({
                        title: "Logged out, redirecting you to login page",
                        color: "success",
                        icon: <IoIosCheckmarkCircle />,
                        classNames: { icon: "size-5" },
                        timeout: 3000,
                      });
                      setTimeout(() => {
                        setToken(null);
                        localStorage.removeItem("token");
                        navigate("/login");
                      }, 3000);
                    }}
                  >
                    Log out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
          <nav>
            <ul className="flex items-center gap-6">
              <li className="font-medium">
                <NavLink
                  onClick={(e) => {
                    scrollTo({ top: 0 });
                    if (e.currentTarget.classList.contains("active"))
                      dataQueries.invalidateQueries(["Posts"]);
                  }}
                  className="nav-link flex items-center gap-2"
                  to="/"
                >
                  <PiHouseBold title="Home" className="text-[27px]" />
                  <span className="lg:hidden">Home</span>
                </NavLink>
              </li>
              <li className="font-medium">
                <NavLink
                  onClick={(e) => {
                    scrollTo({ top: 0 });
                    if (e.currentTarget.classList.contains("active"))
                      dataQueries.invalidateQueries(["MyPosts"]);
                  }}
                  className="nav-link flex items-center gap-2"
                  to="/profile"
                >
                  <FaRegCircleUser title="Profile" className="text-[24px]" />
                  <span className="lg:hidden">Profile</span>
                </NavLink>
              </li>
              <li className="font-medium">
                <NavLink
                  className="nav-link flex items-center gap-2"
                  to="/notifications"
                >
                  <TbNotification title="Notifications" className="text-3xl" />
                  <span className="lg:hidden">Notifications</span>
                </NavLink>
              </li>
              <li className="font-medium lg:hidden">
                <NavLink
                  className="nav-link flex items-center gap-2"
                  to="/settings"
                >
                  <PiGearBold className="text-[26px]" />
                  <span className="lg:hidden">Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <Button
            variant="ghost"
            color="danger"
            radius="sm"
            startContent={<MdLogout className="text-lg" />}
            className="lg:hidden w-full bg-transparent flex items-center gap-2"
          >
            <span className="lg:hidden">Logout</span>
          </Button>
        </div>
        <div
          className="menu-overlay hidden peer-checked:block"
          onClick={() => {
            menuInputRef.current.checked = false;
          }}
        ></div>
        <label
          htmlFor="menu-btn"
          className="lg:hidden grow text-end transition-colors text-transparent bg-clip-text cursor-pointer bg-slate-500/60 hover:bg-slate-500/80 dark:bg-slate-400 dark:hover:bg-slate-400/80 peer-checked:bg-sky-600/80 dark:peer-checked:bg-sky-600"
        >
          <i className="fas fa-bars fa-xl"></i>
        </label>
      </div>
    </header>
  );
}
