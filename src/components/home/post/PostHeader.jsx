// React
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
// Context
import { authContext } from "../../../context/Authentication";
import { profileContext } from "../../../context/UserData";
// API & Caching
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
// Icons
import {
  FaBookmark,
  FaPencil,
  FaRegCircleXmark,
  FaTrash,
  FaUserPlus,
  FaXmark,
} from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdPhotoCamera } from "react-icons/md";
// Components
import UserAvatar from "../../avatar/Avatar";

export default function PostHeader({ post, refetch }) {
  const { userData } = useContext(profileContext);
  const { token } = useContext(authContext);
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
  const [postBody, setPostBody] = useState(post.body);
  const [postImage, setPostImage] = useState(post.image);
  const postImageRef = useRef(null);
  const { isPending: isDeletionPending, mutate: deletePost } = useMutation({
    mutationFn: () =>
      axios.delete(`https://route-posts.routemisr.com/posts/${post._id}`, {
        headers: { token: token },
      }),
    onSuccess: () => {
      onDeleteModalClose();
      addToast({
        title: "Post deleted.",
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
        title: `Post ${cleanErrorMsg}.`,
        color: "danger",
        icon: <FaRegCircleXmark />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
    },
  });
  const { isPending: isUpdatePending, mutate: updatePost } = useMutation({
    mutationFn: () => {
      const postData = new FormData();
      postData.append("body", postBody);
      if (postImageRef.current.files[0])
        postData.append("image", postImageRef.current.files[0]);
      return axios.put(
        `https://route-posts.routemisr.com/posts/${post._id}`,
        postData,
        {
          headers: { token: token },
        },
      );
    },
    onSuccess: () => {
      onUpdateModalClose();
      addToast({
        title: "Post updated.",
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
        title: `Post ${cleanErrorMsg}.`,
        color: "danger",
        icon: <FaRegCircleXmark />,
        classNames: { icon: "size-5" },
        timeout: 3000,
      });
    },
  });
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
            {post.user._id === userData?.data.data.user._id ? (
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
        <Modal
          isOpen={isDeleteModalOpen}
          onOpenChange={onDeleteModalOpenChange}
        >
          <ModalContent>
            {(onDeleteModalClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete post
                </ModalHeader>
                <ModalBody>
                  <p>
                    <span className="font-medium">Are you sure?</span>
                    <br />
                    Post will be deleted permanently,{" "}
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
                    onPress={deletePost}
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
        <Modal
          isOpen={isUpdateModalOpen}
          onOpenChange={onUpdateModalOpenChange}
        >
          <ModalContent>
            {(onUpdateModalClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit post
                </ModalHeader>
                <ModalBody>
                  <textarea
                    name="post"
                    placeholder="What's on your mind?"
                    className="textarea-input neutral"
                    value={postBody}
                    onChange={(e) => {
                      setPostBody(e.target.value);
                    }}
                    rows="3"
                  ></textarea>
                  <input
                    ref={postImageRef}
                    type="file"
                    className="hidden"
                    id="photo-input"
                    tabIndex="-1"
                    onChange={(e) => {
                      setPostImage(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <Button
                    as="label"
                    htmlFor="photo-input"
                    variant="ghost"
                    color="default"
                    className="flex items-center"
                    isDisabled={isUpdatePending}
                  >
                    <MdPhotoCamera className="text-xl me-2" />
                    {postImage ? "Change" : "Add"} Photo
                  </Button>
                  <div className={`relative ${postImage ? "" : "hidden"}`}>
                    <Image
                      width={"100%"}
                      classNames={{ wrapper: "dark:bg-slate-600/60" }}
                      className="max-h-[20rem] object-cover"
                      src={postImage}
                    />
                    {!post.image && (
                      <Button
                        onPress={() => {
                          postImageRef.current.value = "";
                          setPostImage(null);
                        }}
                        variant="flat"
                        color="danger"
                        className="absolute top-2 right-2 z-40 p-3 rounded-full min-w-fit"
                      >
                        <FaXmark />
                      </Button>
                    )}
                  </div>
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
                    onPress={updatePost}
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
    </>
  );
}
