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
import { useDispatch } from "react-redux";
import { signout } from "../../store/authSlice";
import { errorToast, successToast } from "../../components/toasts";
import { BASE_API_URL } from "../../lib/constants";

const randomCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

export default function DeleteAccountButton() {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (+code !== randomCode) {
      return errorToast("Invalid code, please try again.");
    }

    const res = await fetch(`${BASE_API_URL}/users/account/delete`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    if (json.affected) {
      dispatch(signout());
      successToast("Account successfully deleted.");
    } else {
      return errorToast("Oops. Something went wrong.");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="danger">
        Delete Account
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Account?</ModalHeader>
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
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
