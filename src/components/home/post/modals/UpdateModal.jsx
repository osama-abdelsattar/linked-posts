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

export default function UpdateModal({
  isOpen,
  onOpenChange,
  onClose,
  refetch,
  itemType,
  endpoint,
  buildPayload,
  isFormPristine,
  children,
}) {
  const { token } = useContext(authContext);

  const { isPending: isUpdatePending, mutate: updateItem } = useMutation({
    mutationFn: () => {
      const payload = buildPayload();
      return api.put(endpoint, payload, {
        headers: { token: token },
      });
    },
    onSuccess: () => {
      onClose();
      showSuccessToast(`${itemType} updated.`);
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
              Edit {itemType.toLowerCase()}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button
                isDisabled={isUpdatePending}
                color="default"
                variant="light"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={isFormPristine}
                onPress={updateItem}
                isLoading={isUpdatePending}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
