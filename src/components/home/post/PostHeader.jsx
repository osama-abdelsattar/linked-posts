// React
import { Link } from "react-router-dom";
import { useContext } from "react";
import { profileContext } from "../../../context/UserData";
// API & Caching
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { FaBookmark, FaPencil, FaTrash, FaUserPlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteModal from "./modals/DeleteModal";
import UpdatePostModal from "./modals/UpdatePostModal";
import UserAvatar from "../../avatar/Avatar";

export default function PostHeader({ post, refetch }) {
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
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to={`/user/${post.user._id}`}>
            <UserAvatar
              classNames={{
                base: "bg-slate-200 dark:bg-slate-600",
                icon: "text-slate-500 dark:text-slate-400 size-8",
              }}
              className="size-9 md:size-11"
              isBordered
              src={post.user.photo}
            />
          </Link>
          <div className="flex flex-col">
            <p className="text-[15px] md:text-base font-medium text-slate-700 dark:text-slate-300 transition-colors">
              {post.user.name}
            </p>
            <p className="text-[13px] md:text-sm text-slate-500">
              {new Date(post.createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
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
            <DropdownItem
              showDivider
              key="Bookmark"
              classNames={{
                base: "data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5 transition-colors",
              }}
              startContent={<FaBookmark />}
              textValue="Save"
            >
              Save
            </DropdownItem>
            {post.user._id === userData?.user._id ? (
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
                key={`Follow ${post.user.name}`}
                classNames={{
                  base: "data-[hover=true]:bg-black/5 dark:data-[hover=true]:bg-white/5 transition-colors",
                }}
                startContent={<FaUserPlus />}
                textValue={`Follow ${post.user.name.split(" ").at(0)} (author)`}
              >
                Follow {post.user.name.split(" ").at(0)} (author)
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        {/* Delete Modal */}
        <DeleteModal
          endpoint={`/posts/${post._id}`}
          itemType="Post"
          isOpen={isDeleteModalOpen}
          onOpenChange={onDeleteModalOpenChange}
          onClose={onDeleteModalClose}
          refetch={refetch}
        />
        {/* Update Modal */}
        <UpdatePostModal
          post={post}
          isOpen={isUpdateModalOpen}
          onOpenChange={onUpdateModalOpenChange}
          onClose={onUpdateModalClose}
          refetch={refetch}
        />
      </div>
    </>
  );
}
