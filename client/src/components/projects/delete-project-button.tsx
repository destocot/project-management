import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { util } from "@/store";

type DeleteProjectButtonProps = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const [confirmation, setConfirmation] = useState("");
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (`project/${projectId.slice(0, 4)}` !== confirmation) {
      return toast.error("Invalid code, please try again.");
    }

    const res = await fetch(`${BASE_API_URL}/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    if (json.affected) {
      toast.success("Project successfully deleted");
      dispatch(util.invalidateTags(["Projects"]));
    } else {
      toast.error("Oops. Something went wrong.");
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="danger"
        size={{ base: "xs", lg: "sm" }}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", lg: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Project?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To confirm, type in the following &quot;project/
              {projectId.slice(0, 4)}
              &quot;.
            </Text>
            <FormControl display="flex" alignItems="center" mt={4}>
              <Input
                type="text"
                value={confirmation}
                size="lg"
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="danger" onClick={handleDelete}>
              Confirm
            </Button>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
