import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Feature } from "@/lib/types";
import { TasksModal } from "@/components/tasks";

type FeatureEntryProps = {
  feature: Feature;
};

export default function FeatureEntry({ feature }: FeatureEntryProps) {
  const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("featureId", feature.id);
    e.dataTransfer.setData("featureStatus", feature.status);
  };

  const tasksCompleted = feature.tasks.reduce((accu, curr) => {
    return accu + (curr.is_completed ? 1 : 0);
  }, 0);

  return (
    <Box
      p={4}
      borderRadius="md"
      _hover={{ cursor: "pointer", bg: "blackAlpha.200" }}
      bg="blackAlpha.100"
      draggable
      onDragStart={handleOnDragStart}
    >
      <HStack justify="space-between">
        <Text>{feature.description}</Text>
        <Flex gap={2} align="center">
          {feature.tasks.length > 0 && (
            <Text>
              {tasksCompleted}/<Text as="b">{feature.tasks.length}</Text>
            </Text>
          )}
          <TasksModal feature={feature} />
        </Flex>
      </HStack>
    </Box>
  );
}
