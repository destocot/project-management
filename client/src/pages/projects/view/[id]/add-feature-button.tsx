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
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { BASE_API_URL } from "../../../../lib/constants";
import { useState } from "react";
import { minLength } from "class-validator";
import { errorToast, successToast } from "../../../../components/toasts";
import { useDispatch } from "react-redux";
import { util } from "../../../../store";

export default function AddFeatureButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const params = useParams();
  const projectId = params.id;

  const handleAddFeature = async () => {
    if (!minLength(description, 6)) {
      return errorToast(
        "Feature description must be at least 6 characters long"
      );
    }

    const res = await fetch(`${BASE_API_URL}/projects/${projectId}/features`, {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    try {
      await res.json();
      onClose();
      successToast("New feature created.");
      dispatch(util.invalidateTags(["Features"]));
    } catch (error) {
      console.error(error);
      errorToast("Oops. Something went wrong trying to create a new feature.");
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        p={4}
        mt={4}
        w="100%"
        borderRadius="md"
        _hover={{
          cursor: "pointer",
          bg: "success.700",
          transition: "all 0.2s",
        }}
        colorScheme="success"
      >
        <PlusSquareIcon boxSize={6} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Feature</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Feature Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button colorScheme="success" onClick={handleAddFeature}>
              Create
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
