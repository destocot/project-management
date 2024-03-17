import { Button, Input } from "@chakra-ui/react";
import { Form } from "react-router-dom";

type ArchiveProjectButtonProps = {
  projectId: string;
  deletedAt: Date | null;
  action: "/projects" | "/archive";
};

export default function ArchiveProjectButton({
  projectId,
  deletedAt,
  action = "/projects",
}: ArchiveProjectButtonProps) {
  return (
    <Form method="PATCH" action={action}>
      <Input type="hidden" name="projectId" value={projectId} />
      <Button
        type="submit"
        colorScheme="warning"
        size={{ base: "xs", lg: "sm" }}
      >
        {deletedAt ? "Restore" : "Archive"}
      </Button>
    </Form>
  );
}
