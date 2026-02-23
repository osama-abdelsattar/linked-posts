// React
import { useState } from "react";
// Components
import UpdateModal from "./UpdateModal";

export default function UpdateCommentModal({
  comment,
  postId,
  isOpen,
  onOpenChange,
  onClose,
  refetch,
}) {
  const [commentText, setCommentText] = useState(comment.content);
  const buildPayload = () => {
    const commentData = new FormData();
    commentData.append("content", commentText);
    return commentData;
  };

  const isPristine = commentText === comment.content;

  return (
    <UpdateModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      refetch={refetch}
      itemType="Comment"
      endpoint={`/posts/${postId}/comments/${comment._id}`}
      buildPayload={buildPayload}
      isFormPristine={isPristine}
    >
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
    </UpdateModal>
  );
}
