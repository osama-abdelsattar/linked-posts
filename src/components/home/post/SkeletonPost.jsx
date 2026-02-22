// HeroUI
import { Card, Skeleton } from "@heroui/react";
// Components
import HorizontalDivider from "../../hr/HorizontalDivider";
import PostActions from "./PostActions";

export default function SkeletonPost() {
  return (
    <Card className="dark:bg-slate-700/60 mb-8" radius="lg">
      <div className="flex items-center py-4 px-6">
        <Skeleton className="dark:bg-slate-600/60 w-12 h-12 rounded-full"></Skeleton>
        <div className="ms-3">
          <Skeleton className="rounded-sm dark:bg-slate-600/60 w-28 h-2.5 mb-2"></Skeleton>
          <Skeleton className="rounded-sm dark:bg-slate-600/60 w-40 h-2"></Skeleton>
        </div>
      </div>
      <HorizontalDivider className="my-0!" />
      <div className="p-4">
        <div className="flex flex-col gap-2 mb-4">
          <Skeleton className="rounded-sm dark:bg-slate-600/60 w-full h-2"></Skeleton>
          <Skeleton className="rounded-sm dark:bg-slate-600/60 w-3/4 h-2"></Skeleton>
        </div>
        <Skeleton className="dark:bg-slate-600/60 w-full h-80 rounded-lg"></Skeleton>
      </div>
      <HorizontalDivider className="my-0!" />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <PostActions />
        </div>
        <Skeleton className="rounded-sm dark:bg-slate-600/60 w-42 h-3 me-6"></Skeleton>
      </div>
    </Card>
  );
}
