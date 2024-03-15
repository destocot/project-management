import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast({
  defaultOptions: {
    duration: 1000,
    isClosable: true,
    position: "top-right",
  },
});

export default function errorToast(description?: string) {
  return toast({
    title: "Error",
    description,
    status: "error",
  } as UseToastOptions);
}
