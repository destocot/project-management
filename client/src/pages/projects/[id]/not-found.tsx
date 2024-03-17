import { Link, useRouteError } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

export default function ProjectNotFound() {
  const error = useRouteError();

  return (
    <Box textAlign="center" mt={20}>
      <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold" mb={4}>
        {error instanceof Error && error.message !== "Not Found"
          ? "404 - Oops. Somethign went wrong."
          : "404 - Project Not Found"}
      </Text>
      <Button colorScheme="blue" as={Link} to="/projects">
        Back to projects
      </Button>
    </Box>
  );
}
