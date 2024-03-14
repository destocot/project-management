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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../../store/authSlice";

const randomCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

export default function DeleteAccountButton() {
  const [code, setCode] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (+code !== randomCode) {
      return toast({
        title: "Error",
        description: "Invalid code, please try again.",
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
    }

    const res = await fetch("http://localhost:3000/api/users/account/delete", {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    if (json.affected) {
      dispatch(signout());
      toast({
        title: "Success",
        description: "Account successfully deleted",
        status: "success",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
    } else {
      return toast({
        title: "Error",
        description: "Oops. Something went wrong.",
        status: "error",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      });
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
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
