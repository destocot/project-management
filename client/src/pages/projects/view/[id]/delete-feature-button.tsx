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
import { useDispatch, useSelector } from "react-redux";
import { RootState, util } from "../../../../store";
import { errorToast, successToast } from "../../../../components/toasts";
import { BASE_API_URL } from "../../../../lib/constants";
import { useParams } from "react-router-dom";

const randomCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

export default function DeleteFeatureButton() {
  const params = useParams();
  const projectId = params.id;

  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (+code !== randomCode) {
      return errorToast("Invalid code, please try again.");
    }

    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    try {
      const json = await res.json();
      if (json.affected) {
        onClose();
        successToast("Feature deleted.");
        dispatch(util.invalidateTags(["Features"]));
      }
    } catch (error) {
      console.error(error);
      errorToast("Oops. Something went wrong trying to delete a feature.");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="danger">
        Delete Feature
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Feature?</ModalHeader>
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
            <Button
              variant="outline"
              _hover={{ bg: "blue.600", color: "white" }}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
