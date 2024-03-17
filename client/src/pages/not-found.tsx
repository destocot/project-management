import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center" mt={20}>
      <Text fontSize={{ base: "3xl", lg: "4xl" }} fontWeight="bold" mb={4}>
        404 - Not Found
      </Text>
      <Text fontSize={{ base: "lg", lg: "xl" }} mb={8}>
        Oops! Looks like the page you're looking for does not exist.
      </Text>
      <Button colorScheme="blue" as={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
}
