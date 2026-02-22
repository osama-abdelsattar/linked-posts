// React
import { useContext } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// Styles
import "./Profile.css";
// Icons
import { FaPlus } from "react-icons/fa6";
// Components
import SkeletonProfile from "./SkeletonProfile";
import ProfileContent from "./ProfileContent";
import ProfilePosts from "./ProfilePosts";
import ReloadSpinner from "../reload-spinner/ReloadSpinner";
import CreatePostPopover from "../create-post-modal/CreatePostPopover";

export default function MyProfile() {
  const { token } = useContext(authContext);
  const { userData, userDataLoading } = useContext(profileContext);
  const {
    data: userPosts,
    isLoading: userPostsLoading,
    isFetching: userPostsFetching,
    refetch,
  } = useQuery({
    queryKey: ["MyPosts"],
    queryFn: () =>
      axios.get(
        `https://route-posts.routemisr.com/users/${userData.data.data.user._id}/posts`,
        { headers: { token: token } },
      ),
    staleTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return userDataLoading ? (
    <SkeletonProfile />
  ) : (
    <>
      {userPostsFetching && <ReloadSpinner />}
      <div className="flex flex-col gap-6">
        <ProfileContent
          data={userData}
          posts={userPosts}
          isPostsLoading={userPostsLoading}
        />
        <div className="flex justify-between items-center">
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
        </div>
        <ProfilePosts
          posts={userPosts}
          isPostsLoading={userPostsLoading}
          emptyText="You haven't posted anything yet."
          refetch={refetch}
        />
      </div>
    </>
  );
}
