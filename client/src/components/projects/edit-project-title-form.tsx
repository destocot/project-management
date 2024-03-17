import { Heading } from "@chakra-ui/react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { Form, useParams } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";

type EditProjectTitleFormProps = {
  projectTitle: string;
  editProjectTitle: boolean;
};

export default function EditProjectTitleForm({
  projectTitle,
  editProjectTitle,
}: EditProjectTitleFormProps) {
  const { projectId } = useParams();
  const [title, setTitle] = useState(projectTitle);

  if (editProjectTitle) {
    return (
      <Form method="PATCH" action={`/projects/${projectId}`}>
        <FormControl display="flex" gap={4} alignItems="center">
          <Input
            type="text"
            name="title"
            borderTop="none"
            borderX="none"
            _focus={{ ring: "none" }}
            fontSize={{ base: "xl", lg: "4xl" }}
            fontWeight="semibold"
            w={{ vase: "100%", lg: `${title.length + 2}ch` }}
            pl={0}
            boxSizing="border-box"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" colorScheme="warning" size="sm">
            <CheckIcon />
          </Button>
        </FormControl>
      </Form>
    );
  }

  return (
    <Heading as="h2" fontSize={{ base: "xl", lg: "4xl" }} fontWeight="semibold">
      {projectTitle}
    </Heading>
  );
}
