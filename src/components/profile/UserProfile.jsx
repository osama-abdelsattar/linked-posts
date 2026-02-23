// React
import { useParams } from "react-router-dom";
import { useContext } from "react";
// Context
import { authContext } from "../../context/Authentication";
import { profileContext } from "../../context/UserData";
// API & Caching
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// Styles
import "./Profile.css";
// Components
import SkeletonProfile from "./SkeletonProfile";
import ProfileContent from "./ProfileContent";
import ProfilePosts from "./ProfilePosts";
import MyProfile from "./MyProfile";

export default function UserProfile() {
  const { token } = useContext(authContext);
  const params = useParams();
  const myDataContext = useContext(profileContext);
  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["UserData", params.userId],
    queryFn: getUserData,
  });
  const { data: userPosts, isLoading: userPostsLoading } = useQuery({
    queryKey: ["UserPosts", params.userId],
    queryFn: getUserPosts,
  });
  function getUserPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${params.userId}/posts`,
      { headers: { token: token } },
    );
  }
  function getUserData() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${params.userId}/profile`,
      { headers: { token: token } },
    );
  }
  if (params.userId === myDataContext.userData?.data.data.user._id)
    return <MyProfile />;
  return userDataLoading ? (
    <SkeletonProfile />
  ) : (
    <div className="flex flex-col gap-2 sm:gap-6">
      <ProfileContent
        data={userData}
        posts={userPosts}
        isPostsLoading={userPostsLoading}
        noPictureEdit
      />
      <div className="flex-col items-start py-3 px-4 sm:p-0">
        <h2 className="text-3xl font-semibold">Posts</h2>
      </div>
      <ProfilePosts
        posts={userPosts}
        isPostsLoading={userPostsLoading}
        noActionBtn
        emptyText={`${userData.data.data.user.name.split(" ").at(0)} haven't posted anything yet.`}
      />
    </div>
  );
}
