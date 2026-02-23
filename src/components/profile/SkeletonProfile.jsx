// HeroUI
import { Card, Skeleton } from "@heroui/react";

export default function SkeletonProfile() {
  return (
    <div className="flex flex-col gap-2 sm:gap-6">
      <Card className="dark:bg-slate-700/60 transition-colors p-4 gap-4">
        <Skeleton className="w-full h-56 object-cover rounded-lg dark:bg-slate-600/60 transition-colors" />
        <div className="w-full flex justify-start lg:grid grid-cols-[2fr_3fr_2fr] items-center gap-3 flex-wrap">
          <div className="order-2 lg:order-1">
            <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-56 h-3.5 mb-2" />
            <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-42 h-2.5" />
          </div>
          <div className="order-3 ms-auto lg:ms-0 flex items-center justify-between gap-4 lg:place-self-center">
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 md:py-3 md:px-4 w-28">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2.5" />
            </div>
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 md:py-3 md:px-4 w-28">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2.5" />
            </div>
            <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 md:py-3 md:px-4 w-28">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2.5" />
            </div>
          </div>
          <div className="order-1 lg:order-3 cursor-pointer lg:place-self-end">
            <Skeleton className="dark:bg-slate-600/60 transition-colors size-14 rounded-full" />
          </div>
        </div>
      </Card>
      <Card className="dark:bg-slate-700/60 transition-colors p-6 gap-4">
        <Skeleton className="rounded-sm w-32 h-3 dark:bg-slate-600/60 transition-colors" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
          <div className="bg-slate-200/60 dark:bg-slate-700 transition-colors rounded-lg p-2 flex items-center gap-2">
            <Skeleton className="dark:bg-slate-600/60 rounded-lg size-8" />
            <div className="w-full">
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors w-2/5 h-2.5 mb-1" />
              <Skeleton className="rounded-sm dark:bg-slate-600/60 transition-colors h-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
