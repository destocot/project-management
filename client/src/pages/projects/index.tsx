import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LinkIcon } from "@chakra-ui/icons";
import { ArchiveProjectButton } from "@/components/projects";
import { useProjectsListQuery } from "@/store";
import Loading from "@/components/loading";
import GenericError from "@/components/generic-error";

export default function ProjectsPage() {
  const {
    isUninitialized,
    isLoading,
    isError,
    data: projects,
  } = useProjectsListQuery();

  if (isUninitialized || isLoading) return <Loading />;
  if (isError) return <GenericError />;

  return (
    <Box p={{ lg: 4 }}>
      <Heading as="h2">All Projects</Heading>
      <TableContainer
        maxW={{ base: "100%", lg: "80%" }}
        mt={4}
        maxH="3xl"
        overflowY="auto"
      >
        <Table colorScheme="blue" p={4} size={{ base: "sm", lg: "md" }}>
          <Thead>
            <Tr>
              <Th>Details</Th>
              <Th>Title</Th>
              <Th>Archive?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((p) => (
              <Tr key={p.id} _hover={{ bg: "blue.100" }}>
                <Td py={0} pr={0} w="10ch">
                  <Button
                    size="lg"
                    as={Link}
                    to={`/projects/${p.id}`}
                    my={0}
                    colorScheme="blue"
                    variant="link"
                    sx={{
                      _hover: {
                        transform: "scale(1.5)",
                        transition: "all 0.2s",
                      },
                    }}
                  >
                    <LinkIcon />
                  </Button>
                </Td>
                <Td maxW={{ base: "20ch", lg: "none" }} isTruncated>
                  {p.title}
                </Td>
                <Td py={0} w="10ch">
                  <ArchiveProjectButton
                    projectId={p.id}
                    deletedAt={p.deleted_at}
                    action="/projects"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
