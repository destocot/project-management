import { Box, Flex, Heading } from "@chakra-ui/react";
import { Feature, FeatureStatus } from "../../../../lib/types";
import FeatureEntry from "./feature-entry";
import AddFeatureButton from "./add-feature-button";
import { BASE_API_URL } from "../../../../lib/constants";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { util } from "../../../../store";
import { successToast, errorToast } from "../../../../components/toasts";

type FeatureColumProps = {
  features: Feature[];
  status: FeatureStatus;
};

export default function FeatureColumn({ features, status }: FeatureColumProps) {
  const params = useParams();
  const projectId = params.id;
  if (!projectId) throw new Error("Project ID Not Found");

  const dispatch = useDispatch();

  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    const featureId = e.dataTransfer.getData("featureId");
    const featureStatus = e.dataTransfer.getData("featureStatus");

    if (featureStatus === status) return;

    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/features/${featureId}`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    try {
      await res.json();
      successToast("Feature updated.");
      dispatch(util.invalidateTags(["Features"]));
    } catch (error) {
      console.error(error);
      errorToast("Oops. Something went wrong trying to update a feature.");
    }
  };

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Box>
      <Heading as="h4" size="md" textTransform="uppercase">
        {status.replace("_", " ")}
      </Heading>
      <Flex
        mt={4}
        borderWidth="1px"
        borderColor="blackAlpha.200"
        p={4}
        borderRadius="lg"
        flexDir="column"
        gap={4}
        overflowY="auto"
        h={{ base: "sm", lg: "xl" }}
        onDrop={handleOnDrop}
        onDragOver={handleOnDrag}
      >
        {features.map((f) => (
          <FeatureEntry feature={f} key={f.id} />
        ))}
      </Flex>
      {status === FeatureStatus.OPEN && <AddFeatureButton />}
    </Box>
  );
}
