import { Link, useActionData, useParams } from "react-router-dom";
import { Box, Button, Divider, HStack, Heading } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import GenericError from "@/components/generic-error";
import Loading from "@/components/loading";
import * as toast from "@/components/toasts";
import { useProjectDetailsQuery } from "@/store";
import { EditProjectButton, EditProjectTitleForm } from "@/components/projects";
import { FeaturesList } from "@/components/features";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  if (!projectId) throw new Error("Project ID Not Found");

  const response = useActionData() as { id: string };
  const [editProjectTitle, setEditProjectTitle] = useState(false);

  useEffect(() => {
    if (response?.id) {
      toast.success("Project updated!");
      setEditProjectTitle(false);
    }
  }, [response?.id]);

  const {
    isUninitialized,
    isLoading,
    isError,
    data: project,
  } = useProjectDetailsQuery({ projectId });

  if (isUninitialized || isLoading) return <Loading />;
  if (isError) return <GenericError />;

  return (
    <Box p={4}>
      <HStack>
        <Button
          leftIcon={<ArrowLeftIcon />}
          as={Link}
          to="/projects"
          colorScheme="blue"
        >
          back to all projects
        </Button>
        <EditProjectButton setEditProjectTitle={setEditProjectTitle} />
      </HStack>
      <Divider my={4} />
      <HStack mt={4}>
        <Heading
          as="h2"
          fontSize="4xl"
          fontWeight="semibold"
          bg="blue.500"
          color="white"
          py={1}
          px={2}
          mr={2}
          borderRadius="lg"
        >
          Project:
        </Heading>
        <EditProjectTitleForm
          projectTitle={project.title}
          editProjectTitle={editProjectTitle}
        />
      </HStack>
      <Divider my={4} />
      <FeaturesList projectId={project.id} />
    </Box>
  );
}
