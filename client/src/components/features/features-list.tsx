import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { useFeaturesListQuery } from "@/store";
import Loading from "@/components/loading";
import GenericError from "@/components/generic-error";
import FeatureColumn from "./feature-column";
import { FeatureStatus } from "@/lib/types";

type FeaturesListProps = { projectId: string };

export default function FeaturesList({ projectId }: FeaturesListProps) {
  const {
    isUninitialized,
    isLoading,
    isError,
    data: features,
  } = useFeaturesListQuery({ projectId });

  if (isUninitialized || isLoading) return <Loading />;
  if (isError) return <GenericError />;

  const { open, in_progress, done } = features.reduce(
    (accu, curr) => {
      return { ...accu, [curr.status]: [...accu[curr.status], curr] };
    },
    { open: [], in_progress: [], done: [] }
  );

  return (
    <Box>
      <Heading as="h3" size="lg">
        Features
      </Heading>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4} mt={4}>
        <FeatureColumn status={FeatureStatus.OPEN} features={open} />
        <FeatureColumn
          status={FeatureStatus.IN_PROGRESS}
          features={in_progress}
        />
        <FeatureColumn status={FeatureStatus.DONE} features={done} />
      </SimpleGrid>
    </Box>
  );
}
