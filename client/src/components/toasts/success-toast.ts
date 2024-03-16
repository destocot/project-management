import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { toast } = createStandaloneToast({
  defaultOptions: {
    duration: 1500,
    isClosable: true,
    position: "bottom-right",
  },
});

export default function successToast(description?: string) {
  return toast({
    title: "Success",
    description,
    status: "success",
  } as UseToastOptions);
}
