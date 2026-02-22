// HeroUI
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
// Components
import HorizontalDivider from "../../hr/HorizontalDivider";
import PostActions from "./PostActions";
import CommentCard from "./CommentCard";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import AddComment from "./AddComment";

export default function PostCard({ post, className, refetch }) {
  return (
    <Card
      className={`dark:bg-slate-700/60 transition-colors mb-8 ${className || ""}`}
    >
      <CardHeader className="flex gap-3 p-4 ">
        <PostHeader post={post} refetch={refetch} />
      </CardHeader>
      {post.body && <HorizontalDivider className="my-0!" />}
      <CardBody className="p-0">
        <PostBody
          post={post}
          imageClassName="max-h-[40rem] object-cover"
          bodyClassName="transition-colors hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          bodyNavigateTo={`/post/${post._id}`}
        />
      </CardBody>
      {!post.image && <HorizontalDivider className="my-0!" />}
      <CardFooter className="flex justify-between items-center p-0 rounded-none">
        <div className="flex items-center">
          <PostActions hover />
        </div>
        <p className="text-slate-400 cursor-pointer hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors px-7 py-4 ">
          {post.commentsCount} Comments
        </p>
      </CardFooter>
      {post.commentsCount !== 0 && <HorizontalDivider className="my-0!" />}
      <div
        className={`py-4 ${post.commentsCount === 0 ? "pt-0" : ""} flex flex-col gap-4`}
      >
        {post.topComment && (
          <CommentCard
            comment={post.topComment}
            postId={post._id}
            refetch={refetch}
          />
        )}
        <HorizontalDivider className="my-0!" />
        <AddComment postId={post._id} refetch={refetch} />
      </div>
    </Card>
  );
}
