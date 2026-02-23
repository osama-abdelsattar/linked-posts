// Components
import SkeletonPost from "../home/post/SkeletonPost";
import Empty from "../empty/Empty";
import { FaNewspaper } from "react-icons/fa6";
import PostCard from "../home/post/PostCard";

export default function ProfilePosts({
  posts,
  isPostsLoading,
  noActionBtn,
  emptyText,
  refetch,
}) {
  return (
    <>
      {isPostsLoading ? (
        <SkeletonPost />
      ) : posts.posts.length === 0 ? (
        <Empty
          className="dark:bg-slate-700/60 text-slate-700 dark:text-sky-50 transition-colors p-6 gap-4"
          icon={FaNewspaper}
          description={emptyText}
          destination="/"
          noActionBtn={noActionBtn}
          actionText="Create your first post"
        />
      ) : (
        posts.posts.map((post) => (
          <PostCard
            className={"mb-0!"}
            key={post._id}
            post={post}
            refetch={refetch}
          />
        ))
      )}
    </>
  );
}
