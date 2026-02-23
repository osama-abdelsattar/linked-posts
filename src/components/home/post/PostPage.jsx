// React
import { useContext } from "react";
import { useParams } from "react-router-dom";
// Context
import { authContext } from "../../../context/Authentication";
// API & Caching
import api from "../../../api";
import { useQuery } from "@tanstack/react-query";
// HeroUI
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@heroui/react";
// Components
import SkeletonPost from "./SkeletonPost";
import PostHeader from "./PostHeader";
import HorizontalDivider from "../../hr/HorizontalDivider";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import CommentCard from "./CommentCard";
import AddComment from "./AddComment";
import Empty from "../../empty/Empty";
import { FaXmark } from "react-icons/fa6";
// Motion
import { motion } from "framer-motion";
// Functional Components
function SkeletonComment() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4"
      children={[
        <div key="skeletonPost" className="flex items-start gap-3">
          <Skeleton className="dark:bg-slate-600/60 size-8 rounded-full" />
          <div className="bg-slate-200/80 dark:bg-slate-800/80 transition-colors py-2 px-4 rounded-xl grow flex flex-col justify-center gap-1.5">
            <Skeleton className="rounded-sm dark:bg-slate-600/60 w-40 h-2 mb-1" />
            <Skeleton className="rounded-sm dark:bg-slate-600/60 w-full h-1.5" />
            <Skeleton className="rounded-sm dark:bg-slate-600/60 w-2/5 h-1.5" />
          </div>
        </div>
      ]}
    />
  );
}

export default function PostPage() {
  const { token } = useContext(authContext);
  const params = useParams();
  const {
    data: postData,
    isLoading: postLoading,
    isError,
    error,
    refetch: postRefetch,
  } = useQuery({
    queryKey: ["PostPage", params.postId],
    queryFn: getPost,
    select: (res) => res.data.data,
  });
  const {
    data: commentsData,
    isLoading: commentsLoading,
    refetch: commentsRefetch,
  } = useQuery({
    queryKey: ["comments", params.postId],
    queryFn: getComments,
    select: (res) => res.data.data,
  });
  function getPost() {
    return api.get(`/posts/${params.postId}`, {
      headers: {
        token: token,
      },
    });
  }
  function getComments() {
    return api.get(`/posts/${params.postId}/comments`, {
      headers: {
        token: token,
      },
    });
  }
  return isError ? (
    <Empty
      className="h-[calc(100vh-11rem)]"
      actionText="Go to Homepage"
      destination="/"
      description={error.response.data.message}
      icon={FaXmark}
    />
  ) : postLoading ? (
    <SkeletonPost />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sm:min-h-[calc(100vh-8rem)] flex items-center"
      children={[
        <Card
          key="postPage"
          className="dark:bg-slate-700/60 transition-colors rounded-none sm:rounded-xl grow"
        >
          <CardHeader className="flex gap-3 px-6 py-4">
            <PostHeader post={postData.post} refetch={postRefetch} />
          </CardHeader>
          {postData.post.body || postData.post.image ? (
            <HorizontalDivider className="my-0!" />
          ) : (
            false
          )}
          <CardBody className="p-0">
            <PostBody post={postData.post} />
          </CardBody>
          <HorizontalDivider className="my-0!" />
          <CardFooter className="flex justify-between items-center p-0 rounded-none">
            <div className="flex items-center">
              <PostActions hover />
            </div>
            {commentsData?.comments ? (
              <p className="text-slate-400 cursor-pointer hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors p-3 text-sm md:text-base md:p-4">
                {commentsData.comments.length} Comments
              </p>
            ) : (
              <Skeleton className="w-20 h-3 inline-block rounded-sm dark:bg-slate-600/60" />
            )}
          </CardFooter>
          {commentsData?.comments.length !== 0 && (
            <HorizontalDivider className="my-0!" />
          )}
          <div
            className={`py-4 ${
              commentsData?.comments.length === 0 ? "pt-0" : ""
            } flex flex-col gap-4`}
          >
            {commentsData?.comments.length === 0 && (
              <HorizontalDivider className="my-0!" />
            )}
            <AddComment refetch={commentsRefetch} postId={postData.post._id} />
            {commentsData?.comments.length !== 0 && (
              <HorizontalDivider className="my-0!" />
            )}
            {commentsLoading ? (
              <SkeletonComment />
            ) : (
              commentsData.comments.length !== 0 &&
              commentsData.comments.map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  postId={postData.post._id}
                  refetch={commentsRefetch}
                />
              ))
            )}
          </div>
        </Card>,
      ]}
    />
  );
}
