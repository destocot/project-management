import { Checkbox, Text } from "@chakra-ui/react";
import { Task } from "../../../../lib/types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, util } from "../../../../store";
import { BASE_API_URL } from "../../../../lib/constants";
import { errorToast, successToast } from "../../../../components/toasts";

type UpdateTaskStatusCheckboxProps = {
  task: Task;
};

export default function UpdateTaskStatusCheckbox({
  task,
}: UpdateTaskStatusCheckboxProps) {
  const params = useParams();
  const projectId = params.id;

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);
  const dispatch = useDispatch();

  const handleUpdateTask = async () => {
    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}/tasks/${task.id}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    try {
      await res.json();
      successToast("Task updated.");
      dispatch(util.invalidateTags(["Tasks"]));
    } catch (e) {
      console.error(e);
      errorToast("Oops. Something went wrong trying to update a task.");
    }
  };

  return (
    <Checkbox
      size="lg"
      colorScheme="blue"
      isChecked={task.is_completed}
      gap={4}
      onChange={handleUpdateTask}
    >
      <Text fontSize="xl" as={task.is_completed ? "s" : "p"}>
        {task.content}
      </Text>
    </Checkbox>
  );
}
