import { Checkbox, Text, HStack } from "@chakra-ui/react";
import { Task } from "@/lib/types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, util } from "@/store";
import { BASE_API_URL } from "@/lib/constants";
import * as toast from "@/components/toasts";

type UpdateTaskStatusCheckboxProps = {
  task: Task;
};

export default function UpdateTaskStatusCheckbox({
  task,
}: UpdateTaskStatusCheckboxProps) {
  const { projectId } = useParams();

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
      toast.success("Task updated.");
      dispatch(util.invalidateTags(["Tasks"]));
    } catch (e) {
      console.error(e);
      toast.error("Oops. Something went wrong trying to update a task.");
    }
  };

  return (
    <HStack gap={2} w="100%" mr={2}>
      <Checkbox
        size="lg"
        colorScheme="blue"
        isChecked={task.is_completed}
        gap={4}
        onChange={handleUpdateTask}
      ></Checkbox>
      <Text
        fontSize={{ base: "md", lg: "xl" }}
        as={task.is_completed ? "s" : "p"}
        onClick={handleUpdateTask}
        _hover={{ cursor: "pointer" }}
        w="100%"
      >
        {task.content}
      </Text>
    </HStack>
  );
}
