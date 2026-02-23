// React
import { Link } from "react-router-dom";
import { useContext } from "react";
import { profileContext } from "../../../context/UserData";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import DeleteModal from "./modals/DeleteModal";
import UpdateCommentModal from "./modals/UpdateCommentModal";
// Icons
import { FaPencil, FaTrash, FaUserPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
// Components
import UserAvatar from "../../avatar/Avatar";
// Motion
import { motion } from "framer-motion";

export default function CommentCard({ comment, postId, refetch }) {
  const { userData } = useContext(profileContext);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onOpenChange: onUpdateModalOpenChange,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="px-4"
      children={[
        <div key="card" className="flex items-start">
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
            <Dropdown
              placement="bottom-end"
              classNames={{ content: "bg-sky-50 dark:bg-slate-700" }}
            >
              <DropdownTrigger>
                <div className="text-xl py-2 px-1 bg-transparent dark:hover:bg-white/5 transition-background cursor-pointer rounded-md">
                  <BsThreeDotsVertical />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Post Actions">
                {comment.commentCreator._id === userData.user._id ? (
                  [
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
                    </DropdownItem>,
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
                    </DropdownItem>,
                  ]
                ) : (
                  <DropdownItem
                    key={`Follow ${comment.commentCreator.name}`}
                    classNames={{
                      base: "data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5 transition-colors",
                    }}
                    startContent={<FaUserPlus />}
                    textValue={`Follow ${comment.commentCreator.name
                      .split(" ")
                      .at(0)} (commenter)`}
                  >
                    Follow {comment.commentCreator.name.split(" ").at(0)}{" "}
                    (commenter)
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>,
        <DeleteModal
          key="deleteModal"
          endpoint={`/posts/${postId}/comments/${comment._id}`}
          itemType="Comment"
          isOpen={isDeleteModalOpen}
          onOpenChange={onDeleteModalOpenChange}
          onClose={onDeleteModalClose}
          refetch={refetch}
        />,
        <UpdateCommentModal
          key="updateCommentModal"
          comment={comment}
          postId={postId}
          isOpen={isUpdateModalOpen}
          onOpenChange={onUpdateModalOpenChange}
          onClose={onUpdateModalClose}
          refetch={refetch}
        />
      ]}
    />
  );
}
