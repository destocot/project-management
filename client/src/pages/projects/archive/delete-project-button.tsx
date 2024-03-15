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
import { errorToast, successToast } from "../../../components/toasts";
import { useRevalidator } from "react-router-dom";
import { BASE_API_URL } from "../../../lib/constants";

const randomCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

type DeleteProjectButtonProps = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const [code, setCode] = useState("");
  const revalidator = useRevalidator();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (+code !== randomCode) {
      return errorToast("Invalid code, please try again.");
    }

    const res = await fetch(`${BASE_API_URL}/projects/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    if (json.affected) {
      revalidator.revalidate();
      successToast("Project successfully deleted");
    } else {
      errorToast("Oops. Something went wrong.");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="danger" size="sm">
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Project?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To confirm, type in the following numbers &quot;{randomCode}
              &quot;.
            </Text>
            <FormControl display="flex" alignItems="center" mt={4}>
              <Input
                type="number"
                value={code}
                size="lg"
                onChange={(e) => setCode(e.target.value)}
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
