import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Form, Link, useActionData } from "react-router-dom";
import { signin } from "../../store/authSlice";
import { useEffect } from "react";
import { SigninResponse } from "../../lib/types";
import { successToast } from "../../components/toasts";

export default function SigninPage() {
  const dispatch = useDispatch();
  const response = useActionData() as SigninResponse;

  useEffect(() => {
    if (response?.data) {
      dispatch(signin(response.data));
      successToast("Welcome!");
    }
  }, [dispatch, response?.data]);

  return (
    <Flex flexDir="column" justify="center" gap={4} h="75%">
      <Heading as="h2" alignSelf="center">
        Sign In
      </Heading>
      <Form method="POST" action="/signin">
        <Box maxW="sm" mx="auto">
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" id="email" name="email" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Sign In
          </Button>
        </Box>
      </Form>
      <Text mt={4} alignSelf="center" fontSize="lg">
        Don&apos;t have an account? Click{" "}
        <ChakraLink
          as={Link}
          color="blue.500"
          to="/signup"
          fontWeight="semibold"
        >
          here{" "}
        </ChakraLink>
        to sign up.
      </Text>
    </Flex>
  );
}