import { Link, useLoaderData, useActionData } from "react-router-dom";
import { Project } from "../../../../lib/types";
import { Box, Button, Divider, HStack, Heading } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import EditProjectButton from "./edit-project-button";
import { useState, useEffect } from "react";
import EditProjectTitleForm from "./edit-project-title-form";
import { successToast } from "../../../../components/toasts";
import FeaturesList from "./features-list";

export default function ProjectDetails() {
  const project = useLoaderData() as Project;
  const response = useActionData() as { id: string };
  const [editProjectTitle, setEditProjectTitle] = useState(false);

  useEffect(() => {
    if (response?.id) {
      successToast("Project updated!");
      setEditProjectTitle(false);
    }
  }, [response?.id]);

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
