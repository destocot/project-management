import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast({
  defaultOptions: {
    duration: 1000,
    isClosable: true,
    position: "top-right",
  },
});

export default function successToast(description?: string) {
  return toast({
    title: "Success",
    description,
    status: "success",
  } as UseToastOptions);
}
