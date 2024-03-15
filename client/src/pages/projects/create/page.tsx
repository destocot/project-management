import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { successToast } from "../../../components/toasts";
Flex;
export default function CreatePage() {
  const response = useActionData() as { id: string };
  const navigate = useNavigate();

  useEffect(() => {
    if (response?.id) {
      successToast("Project created!");
      navigate(`/projects/view/${response.id}`);
    }
  }, [response?.id, navigate]);

  return (
    <Flex flexDir="column" gap={4} p={4}>
      <Heading as="h2">Create Project</Heading>
      <Form method="POST" action="/projects/create">
        <Box maxW="md">
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Create
          </Button>
        </Box>
      </Form>
    </Flex>
  );
}
