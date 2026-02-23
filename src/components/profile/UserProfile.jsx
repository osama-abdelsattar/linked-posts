// React
import { useParams } from "react-router-dom";
import { useContext } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import api from "../../api";
import { useQuery } from "@tanstack/react-query";
// Motion
import { motion } from "framer-motion";
// Components
import SkeletonProfile from "./SkeletonProfile";
import ProfileContent from "./ProfileContent";
import ProfilePosts from "./ProfilePosts";
import MyProfile from "./MyProfile";

export default function UserProfile() {
  const { token } = useContext(authContext);
  const params = useParams();
  const myDataContext = useContext(profileContext);
  const isNotMe = params.userId !== myDataContext.userData?.user._id;

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["UserData", params.userId],
    queryFn: getUserData,
    select: (res) => res.data.data,
    enabled: isNotMe,
  });
  const { data: userPosts, isLoading: userPostsLoading } = useQuery({
    queryKey: ["UserPosts", params.userId],
    queryFn: getUserPosts,
    select: (res) => res.data.data,
    enabled: isNotMe,
  });
  function getUserPosts() {
    return api.get(`/users/${params.userId}/posts`, {
      headers: { token: token },
    });
  }
  function getUserData() {
    return api.get(`/users/${params.userId}/profile`, {
      headers: { token: token },
    });
  }
  if (params.userId === myDataContext.userData?.user._id) return <MyProfile />;
  return userDataLoading ? (
    <SkeletonProfile />
  ) : (
    <motion.div
      className="flex flex-col gap-2 sm:gap-6"
      children={[
        <ProfileContent
          key="userData"
          data={userData}
          posts={userPosts}
          isPostsLoading={userPostsLoading}
          noPictureEdit
        />,
        <div
          key="userPostsHeading"
          className="flex-col items-start py-3 px-4 sm:p-0"
        >
          <h2 className="text-3xl font-semibold">Posts</h2>
        </div>,
        <ProfilePosts
          key="userPosts"
          posts={userPosts}
          isPostsLoading={userPostsLoading}
          noActionBtn
          emptyText={`${userData.user.name
            .split(" ")
            .at(0)} haven't posted anything yet.`}
        />,
      ]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}
