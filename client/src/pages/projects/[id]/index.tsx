import { Link, useActionData, useParams } from "react-router-dom";
import { Box, Button, Divider, HStack, Heading } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
import * as toast from "@/components/toasts";
import { useProjectDetailsQuery, util } from "@/store";
import { EditProjectButton, EditProjectTitleForm } from "@/components/projects";
import { FeaturesList } from "@/components/features";
import { useDispatch } from "react-redux";
import { Project } from "@/lib/types";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  if (!projectId) throw new Error("Project ID Not Found");
  const dispatch = useDispatch();

  const response = useActionData() as Project;
  const [editProjectTitle, setEditProjectTitle] = useState(false);

  useEffect(() => {
    if (response?.id) {
      toast.success("Project updated!");
      dispatch(util.invalidateTags([{ type: "Projects", id: response.id }]));
      setEditProjectTitle(false);
    }
  }, [response?.title, response?.id, dispatch]);

  const {
    isUninitialized,
    isLoading,
    isError,
    data: project,
  } = useProjectDetailsQuery({ projectId });

  if (isUninitialized || isLoading) return <Loading />;

  if (isError) {
    throw new Error("Not Found");
  }
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
      <HStack mt={4} flexWrap="wrap">
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
