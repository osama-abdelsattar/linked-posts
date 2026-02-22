// HeroUI
import { Avatar, Card, Image, Skeleton } from "@heroui/react";
// Icons
import { TbGenderBigender } from "react-icons/tb";
import { IoCreate } from "react-icons/io5";
import { FaCalendar, FaEnvelope, FaPen } from "react-icons/fa6";
// Styles
import "./Profile.css";

export default function ProfileContent({ data, posts, isPostsLoading }) {
  return (
    <>
      <Card className="dark:bg-slate-700/60 text-slate-700 dark:text-sky-50 transition-colors p-4 gap-4">
        <Image
          width={"100%"}
          src={
            data.data.data.user.cover === "" ? null : data.data.data.user.cover
          }
          classNames={{
            wrapper:
              "w-full h-56 object-cover rounded-lg bg-linear-to-br from-cyan-500 dark:from-cyan-600 from-15% via-teal-500 dark:via-teal-600 to-emerald-500 dark:to-emerald-600 to-90% transition-colors",
          }}
        />
        <div className="w-full flex justify-start lg:grid grid-cols-[2fr_3fr_2fr] items-end gap-3 flex-wrap">
          <div className="order-2 lg:order-1 me-auto lg:me-0">
            <h1 className="text-xl md:text-2xl font-bold -mb-[3px]">
              {data.data.data.user.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 transition-colors">
              @{data.data.data.user.name.replaceAll(" ", "").toLowerCase()}
            </p>
          </div>
          <div className="order-3 ms-auto lg:ms-0 flex items-center justify-between gap-4 lg:place-self-center">
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 text-sm lg:text-base md:py-3 md:px-4">
              <span className="font-medium text-slate-700 dark:text-slate-400 transition-colors">
                {isPostsLoading ? (
                  <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-3.5 h-4 mb-[-2px] inline-block" />
                ) : (
                  posts.data.data.posts.length
                )}
              </span>{" "}
              <span className="text-slate-500">posts</span>
            </div>
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 text-sm lg:text-base md:py-3 md:px-4">
              <span className="font-medium text-slate-700 dark:text-slate-400 transition-colors">
                {data.data.data.user.followersCount}
              </span>{" "}
              <span className="text-slate-500">followers</span>
            </div>
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 text-sm lg:text-base md:py-3 md:px-4">
              <span className="font-medium text-slate-700 dark:text-slate-400 transition-colors">
                {data.data.data.user.followingCount}
              </span>{" "}
              <span className="text-slate-500">following</span>
            </div>
          </div>
          <div
            className="relative order-1 lg:order-3 cursor-pointer lg:place-self-end"
            title="Profile picture"
          >
            <Avatar
              src={data.data.data.user.photo}
              classNames={{
                base: "bg-slate-200 dark:bg-slate-600",
                icon: "text-slate-500 dark:text-slate-400 size-12",
              }}
              className="transition-colors size-14"
            />
            <div className="absolute bottom-0 start-0 bg-sky-500 dark:bg-sky-600 transition-colors text-sky-50 rounded-full size-5 -translate-x-1/4 flex justify-center items-center">
              <FaPen className="text-[10px]" />
              <span className="sr-only">Change profile picture</span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="dark:bg-slate-700/60 text-slate-700 dark:text-sky-50 transition-colors p-6 gap-4">
        <h2 className="text-xl font-semibold">About</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg py-3 px-4 flex items-center gap-3">
            <div className="icon bg-sky-200 dark:bg-sky-500/80 text-sky-600 dark:text-sky-50 transition-colors rounded-md">
              <FaEnvelope />
            </div>
            <div className="content">
              <span className="-mb-0.5 font-medium text-slate-700 dark:text-slate-400 transition-colors">
                Email
              </span>
              <a
                href={`mailto:${data.data.data.user.email}`}
                className="text-sm text-slate-500"
              >
                {data.data.data.user.email}
              </a>
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg py-3 px-4 flex items-center gap-3">
            <div className="icon bg-teal-200 dark:bg-teal-500/80 text-teal-600 dark:text-teal-50 transition-colors rounded-md">
              <FaCalendar />
            </div>
            <div className="content">
              <span className="-mb-0.5 font-medium text-slate-700 dark:text-slate-400 transition-colors">
                Birthday
              </span>
              <span className="text-sm text-slate-500">
                {new Date(data.data.data.user.dateOfBirth).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg py-3 px-4 flex items-center gap-3">
            <div className="icon bg-cyan-200 dark:bg-cyan-500/80 text-cyan-600 dark:text-cyan-50 transition-colors rounded-md">
              <TbGenderBigender className="text-2xl" />
            </div>
            <div className="content">
              <span className="-mb-0.5 font-medium text-slate-700 dark:text-slate-400 transition-colors">
                Gender
              </span>
              <span className="text-sm text-slate-500 capitalize">
                {data.data.data.user.gender}
              </span>
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg py-3 px-4 flex items-center gap-3">
            <div className="icon bg-blue-200 dark:bg-blue-500/80 text-blue-600 dark:text-blue-50 transition-colors rounded-md">
              <IoCreate />
            </div>
            <div className="content">
              <span className="-mb-0.5 font-medium text-slate-700 dark:text-slate-400 transition-colors">
                Created at
              </span>
              <span className="text-sm text-slate-500">
                {new Date(data.data.data.user.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
