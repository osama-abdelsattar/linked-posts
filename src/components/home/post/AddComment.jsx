// React
import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
// Context
import { authContext } from "../../../context/Authentication";
import { profileContext } from "./../../../context/UserData";
// API & Caching
import api from "../../../api";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import { Button } from "@heroui/react";
// Icons
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCircleXmark } from "react-icons/fa6";
// Components
import UserAvatar from "../../avatar/Avatar";
import cleanErrorMsg from "../../../utils/cleanErrorMsg";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

export default function AddComment({ postId, refetch, className }) {
  const { userData } = useContext(profileContext);
  const { token } = useContext(authContext);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);
  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      api.post(
        `/posts/${postId}/comments`,
        {
          content: comment,
        },
        { headers: { token: token } },
      ),
    onSuccess: () => {
      showSuccessToast("Comment posted.");
      commentInputRef.current.value = "";
      setComment("");
      refetch();
    },
    onError: ({ response }) => {
      showErrorToast(`Comment ${cleanErrorMsg(response?.data?.message)}.`);
    },
  });
  return (
    <div className={`px-4 ${className || ""}`}>
      <div className="flex items-center gap-3">
        <Link className="hidden md:block shrink-0" to="/profile">
          <UserAvatar src={userData?.user.photo} />
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
