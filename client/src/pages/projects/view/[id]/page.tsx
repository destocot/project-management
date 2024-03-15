import { Link, useLoaderData, useActionData } from "react-router-dom";
import { Project } from "../../../../lib/types";
import { Box, Button, HStack } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import EditProjectButton from "./edit-project-button";
import { useState, useEffect } from "react";
import EditProjectTitleForm from "./edit-project-title-form";
import { successToast } from "../../../../components/toasts";

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
    <div>
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
      <EditProjectTitleForm
        projectTitle={project.title}
        editProjectTitle={editProjectTitle}
      />
      <Box as="pre" mt={4}>
        {JSON.stringify(project, null, 2)}
      </Box>
    </div>
  );
}
