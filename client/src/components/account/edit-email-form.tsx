import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";

type EditEmailFormProps = {
  defaultEmail: string;
};

export default function EditEmailForm({ defaultEmail }: EditEmailFormProps) {
  return (
    <Flex as={Form} align="center" gap={2} method="PATCH" action="/account">
      <FormControl display="flex" alignItems="center">
        <FormLabel my={0} fontSize="lg">
          Email:
        </FormLabel>
        <Input
          type="email"
          name="email"
          height="fit-content"
          boxSizing="border-box"
          px={2}
          borderTop="none"
          borderX="none"
          borderRadius="none"
          _focus={{ ring: "none" }}
          defaultValue={defaultEmail}
          fontSize="lg"
        />
      </FormControl>
      <Button type="submit" colorScheme="warning" size="sm">
        <CheckIcon />
      </Button>
    </Flex>
  );
}
