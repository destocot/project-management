import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";

export default function EditPasswordForm() {
  return (
    <Flex as={Form} align="center" gap={2} method="PATCH" action="/account">
      <FormControl display="flex" alignItems="center">
        <FormLabel my={0} whiteSpace="nowrap" fontSize="lg">
          Current Password:
        </FormLabel>
        <Input
          type="password"
          name="currentPassword"
          height="fit-content"
          boxSizing="border-box"
          px={2}
          borderTop="none"
          borderX="none"
          borderRadius="none"
          _focus={{ ring: "none" }}
          fontSize="lg"
        />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel my={0} whiteSpace="nowrap" fontSize="lg">
          New Password:
        </FormLabel>
        <Input
          type="password"
          name="password"
          height="fit-content"
          boxSizing="border-box"
          px={2}
          borderTop="none"
          borderX="none"
          borderRadius="none"
          _focus={{ ring: "none" }}
          fontSize="lg"
        />
      </FormControl>
      <Button type="submit" colorScheme="warning" size="sm">
        <CheckIcon />
      </Button>
    </Flex>
  );
}
