import { useParams } from "react-router-dom";
import { RootState, useTasksListQuery } from "../../../../store";
import Loading from "../../../../components/loading";
import GenericError from "../../../../components/generic-error";
import { Progress, Flex, Text, Box } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TaskEntry from "./task-entry";
import { useSelector } from "react-redux";
import CreateTaskForm from "./create-task-form";

export default function TasksList() {
  const params = useParams();
  const projectId = params.id!;

  const featureId = useSelector(({ feature }: RootState) => feature.featureId);
  if (!featureId) throw new Error("Feature ID Not Found");

  const {
    isUninitialized,
    isLoading,
    isError,
    data: tasks,
  } = useTasksListQuery({ projectId, featureId });

  if (isUninitialized || isLoading) return <Loading />;
  if (isError) return <GenericError />;

  const tasksProgress = tasks.reduce((accu, curr) => {
    return accu + (curr.is_completed ? 1 : 0);
  }, 0);

  return (
    <Box>
      <Flex align="center" gap={4}>
        <CheckCircleIcon boxSize={6} color="blue.500" />
        <Text fontSize="lg" fontWeight="semibold">
          Tasks Checklist
        </Text>
      </Flex>
      <Progress
        mt={4}
        value={Math.floor((tasksProgress / tasks.length) * 100)}
        colorScheme="blue"
        hasStripe={true}
      />
      <Flex
        mt={4}
        p={4}
        flexDir="column"
        gap={4}
        h={{ base: "xs", lg: "md" }}
        overflowY="auto"
      >
        {tasks.map((t) => (
          <TaskEntry key={t.id} task={t} />
        ))}
      </Flex>
      <CreateTaskForm />
    </Box>
  );
}
