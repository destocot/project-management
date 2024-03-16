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
import { signout } from "@/store/authSlice";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";

type DeleteAccountButtonProps = {
  email: string | null;
};

export default function DeleteAccountButton({
  email,
}: DeleteAccountButtonProps) {
  const toMatch = email ? email.split("@")[0] : "delete";
  const [confirmation, setConfirmation] = useState("");
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    if (`account/${toMatch}` !== confirmation) {
      return toast.error("Invalid code, please try again.");
    }

    const res = await fetch(`${BASE_API_URL}/users/account`, {
      method: "DELETE",
      credentials: "include",
    });

    const json = await res.json();

    if (json.affected) {
      dispatch(signout());
      toast.success("Account successfully deleted.");
    } else {
      return toast.error("Oops. Something went wrong.");
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
              To confirm, type in the following &quot;account/{toMatch}
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
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
