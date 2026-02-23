// Icons
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";

export default function PostActions({ hover }) {
  return (
    <>
      <button
        className={`p-3 sm:p-4.5 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <BiLike className="text-xl md:me-2" /> <span className="hidden md:inline">Like</span>
      </button>
      <button
        className={`p-3 sm:p-4.5 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <BiCommentDetail className="text-xl md:me-2" /> <span className="hidden md:inline">Comment</span>
      </button>
      <button
        className={`p-3 sm:p-4.5 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <RiShareForwardLine className="text-xl md:me-2" /> <span className="hidden md:inline">Share</span>
      </button>
    </>
  );
}
