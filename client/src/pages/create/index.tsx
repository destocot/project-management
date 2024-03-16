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
import * as toast from "@/components/toasts";
import { useDispatch } from "react-redux";
import { util } from "@/store";

export default function CreatePage() {
  const response = useActionData() as { id: string };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.id) {
      toast.success("Project created!");
      dispatch(util.invalidateTags(["Projects"]));
      navigate(`/projects/${response.id}`);
    }
  }, [response?.id, navigate, dispatch]);

  return (
    <Flex flexDir="column" gap={4} p={4}>
      <Heading as="h2">Create Project</Heading>
      <Form method="POST" action="/create">
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
