// Icons
import { BiCommentDetail, BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";

export default function PostActions({ hover }) {
  return (
    <>
      <button
        className={`px-7 py-4 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <BiLike className="text-xl me-2" /> Like
      </button>
      <button
        className={`px-7 py-4 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <BiCommentDetail className="text-xl me-2" /> Comment
      </button>
      <button
        className={`px-7 py-4 flex items-center text-slate-500 dark:text-slate-300${hover ? " hover:bg-black/7.5 dark:hover:bg-white/5 transition-colors cursor-pointer" : "cursor-default"}`}
      >
        <RiShareForwardLine className="text-xl me-2" /> Share
      </button>
    </>
  );
}
