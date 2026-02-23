// React
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import api from "../../api";
import { useMutation, useQuery } from "@tanstack/react-query";
// HeroUI
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
  Button,
} from "@heroui/react";
// Motion
import { motion } from "framer-motion";
// Icons
import { RiSendPlaneFill } from "react-icons/ri";
import { CgArrowsExpandUpRight } from "react-icons/cg";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
// Components
import SkeletonPost from "./post/SkeletonPost";
import PostCard from "./post/PostCard";
import ReloadSpinner from "../reload-spinner/ReloadSpinner";
import UserAvatar from "./../avatar/Avatar";
import CreatePostPopover from "../create-post-modal/CreatePostPopover";
import cleanErrorMsg from "../../utils/cleanErrorMsg";

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
      api.get("/posts", {
        headers: {
          token: token,
        },
      }),
    staleTime: 1000 * 60 * 15,
    select: (res) => res.data.data,
    refetchOnMount: false,
  });
  const [postBody, setPostBody] = useState("");
  const { isPending, mutate } = useMutation({
    mutationFn: (postData) =>
      api.post("/posts", postData, {
        headers: { token: token },
      }),
    onSuccess: () => {
      showSuccessToast("Posted.");
      setPostBody("");
      refetch();
    },
    onError: ({ response }) => {
      showErrorToast(`Post ${cleanErrorMsg(response?.data?.message)}.`);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      children={[
        isPostsFetching && <ReloadSpinner key="spinner" />,
        <div
          key="heading"
          className="hidden sm:flex items-end justify-between p-6 sm:p-0 sm:mb-6"
        >
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:mb-2">
              Hello,{" "}
              {userData?.user.name.split(" ").at(0) || (
                <Skeleton className="rounded-sm dark:bg-slate-600/60 inline-block w-26 md:w-32 h-6 md:h-8 me-1.5" />
              )}
              !
            </h1>
            <p className="md:text-lg lg:text-xl font-medium text-slate-500">
              See what's new in the world.
            </p>
          </div>
          <Link className="hidden md:block" to="/profile">
            <UserAvatar size="lg" src={userData?.user.photo} />
          </Link>
        </div>,
        <Card
          key="createPostCard"
          shadow="sm"
          className="flex rounded-none py-2 mb-4 sm:mb-6 md:mb-8 sm:py-4 sm:rounded-xl dark:bg-slate-700/60 transition-colors"
        >
          <CardHeader className="flex gap-3 px-4 sm:px-6 justify-between">
            <div className="flex flex-col">
              <p className="font-medium text-slate-700 dark:text-slate-300 transition-colors mb-[-2px]">
                Create a post
              </p>
              <p className="text-sm text-slate-500">
                Share your thoughts with the world
              </p>
            </div>
            <CreatePostPopover
              btnIcon={<CgArrowsExpandUpRight className="size-5 md:size-6" />}
              btnClassName="size-10 md:size-12 p-0 min-w-fit bg-sky-100 text-sky-600 dark:bg-slate-700 dark:text-sky-100"
              refetch={refetch}
            />
          </CardHeader>
          <CardBody className="px-4 sm:px-6">
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
          <CardFooter className="flex items-center px-4 sm:px-6">
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
        </Card>,
        <h2
          key="postsHeading"
          className="hidden sm:block text-3xl font-semibold mb-6"
        >
          Posts
        </h2>,
        isPostsLoading ? (
          <SkeletonPost key="skeletonPost" />
        ) : (
          postsData.posts.map((post) => (
            <PostCard key={post._id} post={post} refetch={refetch} />
          ))
        ),
      ]}
    />
  );
}
