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
  Box,
} from "@chakra-ui/react";
import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Feature } from "@/lib/types";
import { util } from "@/store";
import { useDispatch } from "react-redux";
import { selectFeature } from "@/store/featureSlice";
import TasksList from "./tasks-list";
import { DeleteFeatureButton, UpdateFeatureStatusSelect } from "../features";

type TasksModalProps = {
  feature: Feature;
};

export default function TasksModal({ feature }: TasksModalProps) {
  const { id: featureId, status: featureStatus, description } = feature;

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClose = () => {
    dispatch(util.invalidateTags(["Features"]));
    onClose();
  };

  const handleOnOpen = () => {
    dispatch(selectFeature({ featureId }));
    onOpen();
  };

  return (
    <>
      <Button onClick={handleOnOpen} colorScheme="warning" size="sm" p={0}>
        <HamburgerIcon boxSize={6} />
      </Button>

      <Modal isOpen={isOpen} onClose={handleOnClose} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <CalendarIcon mr={4} />
            {description}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TasksList />
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <UpdateFeatureStatusSelect featureStatus={featureStatus} />
            <Box display="flex" alignItems="center">
              <Button
                colorScheme="blue"
                mr={4}
                variant="outline"
                _hover={{ bg: "blue.600", color: "white" }}
                onClick={handleOnClose}
              >
                Close
              </Button>
              <DeleteFeatureButton />
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
