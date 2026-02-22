// React
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
// HeroUI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
  Button,
  addToast,
} from "@heroui/react";
// Style
import "./Home.css";
// Icons
import { RiSendPlaneFill } from "react-icons/ri";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
// Components
import SkeletonPost from "./post/SkeletonPost";
import PostCard from "./post/PostCard";
import ReloadSpinner from "../reload-spinner/ReloadSpinner";
import UserAvatar from "./../avatar/Avatar";
import CreatePostPopover from "../create-post-modal/CreatePostPopover";

export default function Home() {
  const { token } = useContext(authContext);
  const { userData } = useContext(profileContext);
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
    refetch,
  } = useQuery({
    queryKey: ["Posts"],
    queryFn: () =>
      axios.get("https://route-posts.routemisr.com/posts", {
        headers: {
          token: token,
        },
      }),
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [postBody, setPostBody] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: (postData) =>
      axios.post("https://route-posts.routemisr.com/posts", postData, {
        headers: { token: token },
      }),
    onSuccess: () => {
      addToast({
        title: "Posted.",
        color: "success",
        icon: <IoIosCheckmarkCircle />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
      setPostBody("");
      refetch();
    },
    onError: ({ response }) => {
      const errorMsg = response.data.message;
      const cleanErrorMsg = errorMsg
        .slice(errorMsg.lastIndexOf('"') + 1, errorMsg.length)
        .trim();
      addToast({
        title: `Post ${cleanErrorMsg}.`,
        color: "danger",
        icon: <FaRegCircleXmark />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
    },
  });
  return (
    <>
      {isPostsFetching && <ReloadSpinner />}
      <div className="flex items-end justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-5xl font-semibold mb-2">
            Hello,{" "}
            {userData?.data.data.user.name.split(" ").at(0) || (
              <Skeleton className="rounded-sm dark:bg-slate-600/60 inline-block w-32 h-8 me-1.5" />
            )}
            !
          </h1>
          <p className="text-xl font-medium text-slate-500">
            See what's new in the world.
          </p>
        </div>
        <Link to="/profile">
          <UserAvatar size="lg" src={userData?.data.data.user.photo} />
        </Link>
      </div>
      <Card className="dark:bg-slate-700/60 transition-colors mb-8 py-4">
        <CardHeader className="flex gap-3 px-6 justify-between">
          <div className="flex flex-col">
            <p className="font-medium text-slate-700 dark:text-slate-300 transition-colors mb-[-2px]">
              Create a post
            </p>
            <p className="text-sm text-slate-500">
              Share your thoughts with the world
            </p>
          </div>
          <CreatePostPopover
            refetch={refetch}
            btnIcon={<CgArrowsExpandUpRight />}
            btnClassName="text-xl min-w-fit min-h-fit p-2 bg-sky-100 text-sky-600 dark:bg-slate-700 dark:text-sky-100"
          />
        </CardHeader>
        <CardBody className="px-6">
          <textarea
            name="post"
            placeholder="What's on your mind?"
            className="textarea-input"
            onChange={(e) => {
              setPostBody(e.target.value);
            }}
            rows="4"
            value={postBody}
          ></textarea>
        </CardBody>
        <CardFooter className="flex items-center px-6">
          <Button
            onPress={() => {
              const postData = new FormData();
              postData.append("body", postBody);
              mutate(postData);
            }}
            isLoading={isPending}
            className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 flex items-center ms-auto"
            startContent={
              !isPending && <RiSendPlaneFill className="text-xl me-2" />
            }
          >
            Post
          </Button>
        </CardFooter>
      </Card>
      <h2 className="text-3xl font-semibold mb-6">Posts</h2>
      {isPostsLoading ? (
        <SkeletonPost />
      ) : (
        postsData.data.data.posts.map((post) => (
          <PostCard key={post._id} post={post} refetch={refetch} />
        ))
      )}
    </>
  );
}
