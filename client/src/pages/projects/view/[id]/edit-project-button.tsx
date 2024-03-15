import { Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

type EditProjectButtonProps = {
  setEditProjectTitle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditProjectButton({
  setEditProjectTitle,
}: EditProjectButtonProps) {
  const handleClick = () => {
    setEditProjectTitle((prev) => !prev);
  };

  return (
    <Button leftIcon={<EditIcon />} colorScheme="warning" onClick={handleClick}>
      Edit Project
    </Button>
  );
}
