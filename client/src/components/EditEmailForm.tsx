import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import { Form, useActionData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { update } from "../store/authSlice";

type EditEmailProps = {
  defaultEmail: string;
  setShowEditEmail: React.Dispatch<React.SetStateAction<boolean>>;
};

type EditEmailFormResponse =
  | { data: { email?: string; password?: string } }
  | undefined;

export default function EditEmailForm({
  defaultEmail,
  setShowEditEmail,
}: EditEmailProps) {
  const dispatch = useDispatch();
  const response = useActionData() as EditEmailFormResponse;

  useEffect(() => {
    if (response?.data) {
      setShowEditEmail(false);
      dispatch(update(response.data));
    }
  }, [dispatch, response?.data, setShowEditEmail]);

  return (
    <Flex as={Form} align="center" gap={2} method="PATCH" action="/account">
      <FormControl display="flex" alignItems="center">
        <FormLabel my={0}>Email:</FormLabel>
        <Input
          type="email"
          name="email"
          height="fit-content"
          boxSizing="border-box"
          px={0}
          borderTop="none"
          borderX="none"
          borderRadius="none"
          defaultValue={defaultEmail}
        />
      </FormControl>
      <Button
        type="submit"
        colorScheme="warning"
        height="fit-content"
        py="0.5"
        fontSize="sm"
      >
        Update
      </Button>
    </Flex>
  );
}
