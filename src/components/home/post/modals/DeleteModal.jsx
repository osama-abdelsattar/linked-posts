// React
import { useContext } from "react";
// Context
import { authContext } from "../../../../context/Authentication";
// API & Caching
import api from "../../../../api";
import { useMutation } from "@tanstack/react-query";
// HeroUI
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
// Utils
import { showSuccessToast, showErrorToast } from "../../../../utils/toast";
import cleanErrorMsg from "../../../../utils/cleanErrorMsg";

export default function DeleteModal({
  isOpen,
  onOpenChange,
  onClose,
  refetch,
  endpoint,
  itemType,
}) {
  const { token } = useContext(authContext);

  const { isPending: isDeletionPending, mutate: deleteItem } = useMutation({
    mutationFn: () =>
      api.delete(endpoint, {
        headers: { token: token },
      }),
    onSuccess: () => {
      onClose();
      showSuccessToast(`${itemType} deleted.`);
      refetch();
    },
    onError: ({ response }) => {
      showErrorToast(`${itemType} ${cleanErrorMsg(response?.data?.message)}.`);
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete {itemType.toLowerCase()}
            </ModalHeader>
            <ModalBody>
              <p>
                <span className="font-medium">Are you sure?</span>
                <br />
                {itemType} will be deleted permanently,{" "}
                <span className="text-rose-400">this can't be undone.</span>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isDeletionPending}
                color="default"
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={deleteItem}
                isLoading={isDeletionPending}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
