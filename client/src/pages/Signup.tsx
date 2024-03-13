import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  Box,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { signin } from "../store/authSlice";
import { Form, Link, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { SignupResponse } from "../lib/types";

export default function SignupPage() {
  const dispatch = useDispatch();
  const response = useActionData() as SignupResponse;
  const toast = useToast();

  useEffect(() => {
    if (response) {
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          status: "error",
          position: "top-right",
        });
      }

      if (response.data) {
        dispatch(signin(response.data));
      }
    }
  }, [dispatch, response, toast]);

  return (
    <Flex flexDir="column" justify="center" gap={4} h="75%">
      <Heading as="h2" alignSelf="center">
        Sign Up
      </Heading>
      <Form method="POST" action="/signup">
        <Box maxW="sm" mx="auto">
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="100%">
            Sign up
          </Button>
        </Box>
      </Form>
      <Text mt={4} alignSelf="center" fontSize="lg">
        Already have an account? Click{" "}
        <ChakraLink
          as={Link}
          color="blue.500"
          to="/signin"
          fontWeight="semibold"
        >
          here{" "}
        </ChakraLink>
        to sign in.
      </Text>
    </Flex>
  );
}
