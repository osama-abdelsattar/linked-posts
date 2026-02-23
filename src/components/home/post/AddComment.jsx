// React
import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
// Context
import { authContext } from "../../../context/Authentication";
import { profileContext } from "./../../../context/UserData";
// API & Caching
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import { addToast, Button } from "@heroui/react";
// Icons
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
// Components
import UserAvatar from "../../avatar/Avatar";

export default function AddComment({ postId, refetch, className }) {
  const { userData } = useContext(profileContext);
  const { token } = useContext(authContext);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      axios.post(
        `https://route-posts.routemisr.com/posts/${postId}/comments`,
        {
          content: comment,
        },
        { headers: { token: token } },
      ),
    onSuccess: () => {
      addToast({
        title: "Comment posted.",
        color: "success",
        icon: <IoIosCheckmarkCircle />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
      commentInputRef.current.value = "";
      setComment("");
      refetch();
    },
    onError: ({ response }) => {
      const errorMsg = response.data.message;
      const cleanErrorMsg = errorMsg
        .slice(errorMsg.lastIndexOf('"') + 1, errorMsg.length)
        .trim();
      addToast({
        title: `Comment ${cleanErrorMsg}.`,
        color: "danger",
        icon: <FaRegCircleXmark />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
    },
  });
  return (
    <div className={`px-4 ${className || ""}`}>
      <div className="flex items-center gap-3">
        <Link className="hidden md:block shrink-0" to="/profile">
          <UserAvatar src={userData?.data.data.user.photo} />
        </Link>
        <div className="field w-full">
          <input
            ref={commentInputRef}
            autoComplete="off"
            type="text"
            name="comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="grow rounded-full! py-2!"
            placeholder="Write a comment"
          />
        </div>
        <Button
          className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 min-w-fit h-fit p-0 size-10 md:px-4 shrink-0"
          radius="full"
          isLoading={isPending}
          startContent={
            !isPending && <RiSendPlaneFill className="shrink-0 size-5" />
          }
          onPress={mutate}
        >
          <span className="hidden md:inline">Comment</span>
        </Button>
      </div>
    </div>
  );
}
