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
import { HamburgerIcon } from "@chakra-ui/icons";
import DeleteFeatureButton from "./delete-feature-button";
import UpdateFeatureStatusSelect from "./update-feature-status-select";
import { FeatureStatus } from "../../../../lib/types";
import { util } from "../../../../store";
import { useDispatch } from "react-redux";
import { selectFeature } from "../../../../store/featureSlice";
import TasksList from "./tasks-list";

type TasksModalProps = {
  featureId: string;
  featureStatus: FeatureStatus;
};

export default function TasksModal({
  featureId,
  featureStatus,
}: TasksModalProps) {
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
          <ModalHeader>Create Task Modal</ModalHeader>
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
                onClick={onClose}
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
