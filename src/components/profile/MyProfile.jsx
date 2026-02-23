// React
import { useContext } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
// Styles

// Icons
import { FaPlus } from "react-icons/fa6";
// Components
import SkeletonProfile from "./SkeletonProfile";
import ProfileContent from "./ProfileContent";
import ProfilePosts from "./ProfilePosts";
import CreatePostPopover from "../create-post-modal/CreatePostPopover";
// Motion
import { motion } from "framer-motion";

export default function MyProfile() {
  const { token } = useContext(authContext);
  const { userData, userDataLoading } = useContext(profileContext);
  const {
    data: userPosts,
    isLoading: userPostsLoading,
    refetch,
  } = useQuery({
    queryKey: ["MyPosts"],
    queryFn: () =>
      api.get(`/users/${userData.user._id}/posts`, {
        headers: { token: token },
      }),
    staleTime: 1000 * 60 * 15,
    select: (res) => res.data.data,
    refetchOnMount: false,
  });
  return userDataLoading ? (
    <SkeletonProfile />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 sm:gap-6"
      children={[
        <ProfileContent
          key="myData"
          data={userData}
          posts={userPosts}
          isPostsLoading={userPostsLoading}
        />,
        <div
          key="myPostsHeading"
          className="flex justify-between items-center py-3 px-4 sm:p-0"
        >
          <div className="flex-col p-0">
            <h2 className="text-xl font-semibold">Posts</h2>
            <p className="text-slate-400">See, edit, or delete your posts.</p>
          </div>
          <CreatePostPopover
            refetch={refetch}
            btnIcon={<FaPlus />}
            btnText="Add"
            btnClassName="py-2 px-4 bg-sky-100 text-sky-600 dark:bg-slate-700 dark:text-sky-100"
          />
        </div>,
        <ProfilePosts
          key="myPosts"
          posts={userPosts}
          isPostsLoading={userPostsLoading}
          emptyText="You haven't posted anything yet."
          refetch={refetch}
        />,
      ]}
    />
  );
}
