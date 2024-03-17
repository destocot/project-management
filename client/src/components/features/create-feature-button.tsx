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
import { useState } from "react";
import { minLength } from "class-validator";
import { useDispatch } from "react-redux";
import { util } from "@/store";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";

export default function CreateFeatureButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const { projectId } = useParams();

  const handleAddFeature = async () => {
    if (!minLength(description, 6)) {
      return toast.error(
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
      toast.success("New feature created.");
      setDescription("");
      dispatch(util.invalidateTags(["Features"]));
    } catch (error) {
      console.error(error);
      toast.error("Oops. Something went wrong trying to create a new feature.");
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

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", lg: "md" }}>
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
