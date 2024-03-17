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
} from "@chakra-ui/react";
import {
  ArchiveProjectButton,
  DeleteProjectButton,
} from "@/components/projects";
import { useArchivedProjectsListQuery } from "@/store";
import Loading from "@/components/loading";
import GenericError from "@/components/generic-error";

export default function ProjectsPage() {
  const {
    isUninitialized,
    isLoading,
    isError,
    data: projects,
  } = useArchivedProjectsListQuery();

  if (isUninitialized || isLoading) return <Loading />;
  if (isError) return <GenericError />;

  return (
    <Box p={{ lg: 4 }}>
      <Heading as="h2">Archived Projects</Heading>
      <TableContainer
        maxW={{ base: "100%", lg: "80%" }}
        mt={4}
        maxH="3xl"
        overflowY="auto"
      >
        <Table colorScheme="blue" p={4} size={{ base: "sm", lg: "md" }}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Restore?</Th>
              <Th>Delete?</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((p) => (
              <Tr key={p.id} _hover={{ bg: "gray.100" }}>
                <Td maxW={{ base: "20ch", lg: "none" }} isTruncated>
                  {p.title}
                </Td>
                <Td py={0} w="10ch">
                  <ArchiveProjectButton
                    projectId={p.id}
                    deletedAt={p.deleted_at}
                    action="/archive"
                  />
                </Td>
                <Td py={0} w="10ch">
                  <DeleteProjectButton projectId={p.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
