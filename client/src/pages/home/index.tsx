import { RootState } from "@/store";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const authenticated = useSelector(
    ({ auth }: RootState) => auth.authenticated
  );

  return (
    <Flex
      justify="center"
      align="center"
      h={{ base: "75%", lg: "100%" }}
      mt={-8}
      p={4}
    >
      <Heading textAlign="center" size={{ base: "lg", lg: "xl" }}>
        Welcome to your project managment application. Click{" "}
        <Text
          as={Link}
          to={authenticated ? "/projects" : "/signin"}
          color="blue.500"
          sx={{
            _hover: {
              color: "blue.700",
              transition: "all 0.2s",
              textDecor: "underline",
            },
          }}
        >
          here
        </Text>{" "}
        to get started.
      </Heading>
    </Flex>
  );
}
