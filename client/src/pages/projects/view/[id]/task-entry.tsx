import { Task } from "../../../../lib/types";
import { Flex } from "@chakra-ui/react";
import DeleteTaskButton from "./delete-task-button";
import UpdateTaskStatusCheckbox from "./update-task-status-checkbox";

type TaskEntryProps = {
  task: Task;
};

export default function TaskEntry({ task }: TaskEntryProps) {
  return (
    <Flex justify="space-between">
      <UpdateTaskStatusCheckbox task={task} />
      <DeleteTaskButton taskId={task.id} />
    </Flex>
  );
}
