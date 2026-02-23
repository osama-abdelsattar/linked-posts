// React
import { useNavigate } from "react-router-dom";
// HeroUI
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react";

export default function PostBody({
  post,
  imageClassName,
  bodyClassName,
  bodyNavigateTo,
}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <p
        onClick={() => {
          if (!bodyNavigateTo) return;
          navigate(bodyNavigateTo);
        }}
        className={`${post.body ? "p-3 sm:p-4" : ""} text-sm sm:text-base text-slate-700 dark:text-slate-300 ${bodyClassName || ""}`}
      >
        {post.body}
      </p>
      {post.image && (
        <>
          <Button
            className="min-h-fit p-0 block"
            tabIndex="-1"
            onPress={onOpen}
            radius="none"
            disableRipple
          >
            <Image
              width="100%"
              radius="none"
              classNames={{ wrapper: "dark:bg-slate-600/60" }}
              className={imageClassName}
              src={post.image}
              alt={post.body}
            />
          </Button>
          <Modal
            backdrop="blur"
            radius="none"
            placement="center"
            classNames={{
              closeButton:
                "size-8 p-0 flex justify-center items-center top-2 end-2 text-lg cursor-pointer text-neutral-400 hover:bg-rose-500/10 backdrop-blur-lg hover:text-danger active:bg-rose-500/25 active:text-rose-600 transition-colors z-50",
            }}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent className="max-w-fit! m-0! max-h-screen!">
              <ModalBody className="w-fit p-0 justify-center items-center">
                <div className="">
                  <Image
                    radius="none"
                    className="max-w-screen max-h-screen"
                    classNames={{
                      wrapper: "object-contain",
                    }}
                    src={post.image}
                    alt={post.body}
                  />
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
