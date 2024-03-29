import { useSelector } from "react-redux";
import { RootState } from "../store";
import SignoutButton from "./account/signout-button";
import { Avatar, Flex, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import SigninButon from "./account/signin-button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const email = useSelector(({ auth }: RootState) => auth.acc_email);

  return (
    <Flex as="nav" p={4} mb={4} align="center" flexWrap="wrap" rowGap={4}>
      <Heading as={Link} size={{ base: "lg", lg: "xl" }}>
        Project Management
      </Heading>
      <Spacer />
      <HStack>
        {email ? (
          <HStack spacing={4}>
            <Avatar
              name={email.split("@")[0]}
              bg="blue.500"
              src="/avatar.png"
              color="white"
              alignContent={"center"}
            />
            <Text>{email}</Text>
            <SignoutButton />
          </HStack>
        ) : (
          <SigninButon />
        )}
      </HStack>
    </Flex>
  );
}
