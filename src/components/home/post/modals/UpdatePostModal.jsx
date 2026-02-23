// React
import { useState, useRef } from "react";
// HeroUI
import { Button, Image } from "@heroui/react";
// Icons
import { FaXmark } from "react-icons/fa6";
import { MdPhotoCamera } from "react-icons/md";
// Components
import UpdateModal from "./UpdateModal";

export default function UpdatePostModal({
  post,
  isOpen,
  onOpenChange,
  onClose,
  refetch,
}) {
  const [postBody, setPostBody] = useState(post.body);
  const [postImage, setPostImage] = useState(post.image);
  const postImageRef = useRef(null);
  const buildPayload = () => {
    const postData = new FormData();
    postData.append("body", postBody);
    if (postImageRef.current?.files[0]) {
      postData.append("image", postImageRef.current.files[0]);
    }
    return postData;
  };

  const isPristine = postBody === post.body && postImage === post.image;

  return (
    <UpdateModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      refetch={refetch}
      itemType="Post"
      endpoint={`/posts/${post._id}`}
      buildPayload={buildPayload}
      isFormPristine={isPristine}
    >
      <textarea
        name="post"
        placeholder="What's on your mind?"
        className="textarea-input neutral"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
        rows="3"
      ></textarea>
      <input
        ref={postImageRef}
        type="file"
        className="hidden"
        id="photo-input"
        tabIndex="-1"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setPostImage(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      <Button
        as="label"
        htmlFor="photo-input"
        variant="ghost"
        color="default"
        className="flex items-center"
      >
        <MdPhotoCamera className="text-xl me-2" />
        {postImage ? "Change" : "Add"} Photo
      </Button>
      <div className={`relative ${postImage ? "" : "hidden"}`}>
        <Image
          width={"100%"}
          classNames={{ wrapper: "dark:bg-slate-600/60" }}
          className="max-h-[20rem] object-cover"
          src={postImage || undefined}
        />
        {!post.image && (
          <Button
            onPress={() => {
              if (postImageRef.current) postImageRef.current.value = "";
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
    </UpdateModal>
  );
}
