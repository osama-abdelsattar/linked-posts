// React
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
// Context
import { authContext } from "../../../context/Authentication";
import { profileContext } from "../../../context/UserData";
// HeroUI
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
// API & Caching
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
// Icons
import {
  FaPencil,
  FaRegCircleXmark,
  FaTrash,
  FaUserPlus,
} from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
// Components
import UserAvatar from "../../avatar/Avatar";

export default function CommentCard({ comment, postId, refetch }) {
  const { token } = useContext(authContext);
  const { userData } = useContext(profileContext);
  const [commentText, setCommentText] = useState(comment.content);
  // Delete
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const { isPending: isDeletionPending, mutate: deleteComment } = useMutation({
    mutationFn: () =>
      axios.delete(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
        {
          headers: { token: token },
        },
      ),
    onSuccess: () => {
      onDeleteModalClose();
      addToast({
        title: "Comment deleted.",
        color: "success",
        icon: <IoIosCheckmarkCircle />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
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
  // Update
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onOpenChange: onUpdateModalOpenChange,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const { isPending: isUpdatePending, mutate: updateComment } = useMutation({
    mutationFn: () => {
      const commentData = new FormData();
      commentData.append("content", commentText);
      return axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
        commentData,
        {
          headers: { token: token },
        },
      );
    },
    onSuccess: () => {
      onUpdateModalClose();
      addToast({
        title: "Comment updated.",
        color: "success",
        icon: <IoIosCheckmarkCircle />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
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
    <div className="px-4">
      <div className="flex items-start">
        <Link to={`/user/${comment.commentCreator._id}`}>
          <UserAvatar
            className="mt-1.5 me-3"
            classNames={{
              base: "bg-slate-200 dark:bg-slate-600 transition-colors",
              icon: "text-slate-500 dark:text-slate-400 transition-colors size-8",
            }}
            src={comment.commentCreator.photo}
          />
        </Link>
        <div className="bg-slate-200/80 dark:bg-slate-800/80 transition-colors py-2 px-4 rounded-xl grow flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-medium -mb-[2px] text-slate-500 dark:text-slate-400 transition-colors">
              {comment.commentCreator.name}
            </span>
            <span className="text-sm">{comment.content}</span>
          </div>
          <Dropdown classNames={{ content: "bg-sky-100 dark:bg-slate-700" }}>
            <DropdownTrigger>
              <div className="text-xl py-2 px-1 bg-transparent dark:hover:bg-white/5 transition-background cursor-pointer rounded-md">
                <BsThreeDotsVertical />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Post Actions">
              {comment.commentCreator._id === userData.data.data.user._id ? (
                <>
                  <DropdownItem
                    key="Edit Post"
                    classNames={{
                      base: "data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5 transition-colors",
                    }}
                    startContent={<FaPencil />}
                    textValue="Edit"
                    onPress={onUpdateModalOpen}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="Delete Post"
                    startContent={<FaTrash />}
                    textValue="Delete"
                    variant="solid"
                    color="danger"
                    className="text-danger-500 dark:text-danger-400"
                    onPress={onDeleteModalOpen}
                  >
                    Delete
                  </DropdownItem>
                </>
              ) : (
                <DropdownItem
                  key={`Follow ${comment.commentCreator.name}`}
                  classNames={{
                    base: "data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5 transition-colors",
                  }}
                  startContent={<FaUserPlus />}
                  textValue={`Follow ${comment.commentCreator.name.split(" ").at(0)} (commenter)`}
                >
                  Follow {comment.commentCreator.name.split(" ").at(0)}{" "}
                  (commenter)
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange}>
        <ModalContent>
          {(onDeleteModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete comment
              </ModalHeader>
              <ModalBody>
                <p>
                  <span className="font-medium">Are you sure?</span>
                  <br />
                  Comment will be deleted permanently,{" "}
                  <span className="text-rose-400">this can't be undone.</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isDeletionPending}
                  color="default"
                  variant="light"
                  onPress={onDeleteModalClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={deleteComment}
                  isLoading={isDeletionPending}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {/* Update Modal */}
      <Modal isOpen={isUpdateModalOpen} onOpenChange={onUpdateModalOpenChange}>
        <ModalContent>
          {(onUpdateModalClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit comment
              </ModalHeader>
              <ModalBody>
                <textarea
                  className="textarea-input neutral"
                  placeholder="Enter your edits..."
                  value={commentText}
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  name="comment"
                  rows={4}
                ></textarea>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isUpdatePending}
                  color="default"
                  variant="light"
                  onPress={onUpdateModalClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={commentText === comment.content}
                  onPress={updateComment}
                  isLoading={isUpdatePending}
                >
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
