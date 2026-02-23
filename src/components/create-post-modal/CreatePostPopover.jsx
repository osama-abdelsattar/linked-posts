import { useContext, useRef, useState, useEffect } from "react";
// Context
import { authContext } from "../../context/Authentication";
// API & Caching
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
// Icons
import { FaRegCircleXmark, FaXmark } from "react-icons/fa6";
import { MdPhotoCamera } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import cleanErrorMsg from "../../utils/cleanErrorMsg";
import { showSuccessToast, showErrorToast } from "../../utils/toast";

export default function CreatePostPopover({
  refetch,
  btnIcon,
  btnText,
  btnClassName,
}) {
  const { token } = useContext(authContext);
  const [postBody, setPostBody] = useState("");
  const postImageRef = useRef();
  const [postImage, setPostImage] = useState(null);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (postImage) {
        URL.revokeObjectURL(postImage);
      }
    };
  }, [postImage]);
  const { isPending, mutate } = useMutation({
    mutationFn: (postData) =>
      api.post("/posts", postData, {
        headers: { token: token },
      }),
    onSuccess: () => {
      showSuccessToast("Posted.");
      setPostBody("");
      setPostImage(null);
      refetch();
      onClose();
    },
    onError: ({ response }) => {
      showErrorToast(`Post ${cleanErrorMsg(response?.data?.message)}.`);
    },
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Button className={btnClassName} onPress={onOpen} disableRipple>
        {btnIcon} {btnText}
      </Button>
      <Modal
        placement="center"
        backdrop="blur"
        className="bg-sky-50 text-slate-700 dark:bg-slate-700 dark:text-slate-300 max-w-2xl"
        classNames={{
          closeButton:
            "hover:bg-sky-200 hover:text-sky-600 dark:hover:bg-slate-800/25 dark:hover:text-slate-300/85 transition-colors cursor-pointer top-2 right-2",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Create a post
          </ModalHeader>
          <ModalBody>
            <textarea
              name="post"
              placeholder="What's on your mind?"
              className="border-2 border-slate-300 rounded-xl outline-0 focus:border-slate-400 focus:ring-6 focus:ring-slate-600/40 resize-none p-4 text-slate-600 placeholder:text-slate-400 dark:border-slate-600 dark:focus:border-slate-500/80 dark:focus:ring-slate-600/70 dark:text-slate-300 dark:placeholder:text-slate-500 transition-all"
              onChange={(e) => {
                setPostBody(e.target.value);
              }}
              rows="3"
              value={postBody}
            ></textarea>
            <div className={`relative ${postImage ? "" : "hidden"}`}>
              <Image
                width={"100%"}
                classNames={{ wrapper: "dark:bg-slate-600/60" }}
                className="max-h-[20rem] object-cover"
                src={postImage}
              />
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
            </div>
          </ModalBody>
          <ModalFooter className="justify-between">
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
              color="primary"
              className="flex items-center"
              isDisabled={isPending}
            >
              <MdPhotoCamera className="text-xl me-2" />
              Photo
            </Button>
            <Button
              onPress={() => {
                const postData = new FormData();
                postData.append("body", postBody);
                if (postImageRef.current.files[0])
                  postData.append("image", postImageRef.current.files[0]);
                mutate(postData);
              }}
              isLoading={isPending}
              className="bg-sky-500 dark:bg-sky-400/50 text-sky-50 flex items-center"
              startContent={
                !isPending && <RiSendPlaneFill className="text-xl me-2" />
              }
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
