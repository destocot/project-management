import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Form, Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <Flex flexDir="column" justify="center" gap={4} h="75%" p={4}>
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
      <Text mt={4} alignSelf="center" fontSize={{ base: "md", lg: "lg" }}>
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
