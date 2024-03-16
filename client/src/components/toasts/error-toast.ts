import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast({
  defaultOptions: {
    duration: 1500,
    isClosable: true,
    position: "bottom-right",
  },
});

export default function errorToast(description?: string) {
  return toast({
    title: "Error",
    description,
    status: "error",
  } as UseToastOptions);
}
