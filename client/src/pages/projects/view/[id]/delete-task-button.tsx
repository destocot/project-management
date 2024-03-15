import { Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { RootState, util } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { BASE_API_URL } from "../../../../lib/constants";
import { errorToast, successToast } from "../../../../components/toasts";

type DeleteTaskButtonProps = {
  taskId: string;
};

export default function DeleteTaskButton({ taskId }: DeleteTaskButtonProps) {
  const params = useParams();
  const projectId = params.id;

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}/tasks/${taskId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    try {
      const json = await res.json();

      if (json.affected) {
        successToast("Task deleted.");
        dispatch(util.invalidateTags(["Tasks"]));
      }
    } catch (e) {
      console.error(e);
      errorToast("Oops. Something went wrong trying to delete a task.");
    }
  };

  return (
    <Button size="sm" colorScheme="danger" onClick={handleDeleteTask}>
      <DeleteIcon boxSize={4} />
    </Button>
  );
}
