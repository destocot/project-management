import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Flex, List, ListIcon, ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  CalendarIcon,
  EditIcon,
  RepeatClockIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";

export default function Sidebar() {
  const authenticated = useSelector(
    ({ auth }: RootState) => auth.authenticated
  );

  if (!authenticated) return null;

  return (
    <List
      color="white"
      fontSize="lg"
      gap={4}
      display="flex"
      flexDir={{ base: "row", lg: "column" }}
    >
      <ListItem>
        <Flex
          as={NavLink}
          to="/account"
          end
          p={4}
          borderRadius="lg"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          <ListIcon as={InfoOutlineIcon} />
          Account Details
        </Flex>
      </ListItem>
      <ListItem>
        <Flex
          as={NavLink}
          to="/projects"
          end
          p={4}
          borderRadius="lg"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          <ListIcon as={CalendarIcon} />
          All Projects
        </Flex>
      </ListItem>
      <ListItem>
        <Flex
          as={NavLink}
          to="/projects/create"
          p={4}
          borderRadius="lg"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          <ListIcon as={EditIcon} />
          New Project
        </Flex>
      </ListItem>
      <ListItem>
        <Flex
          as={NavLink}
          to="/projects/archive"
          p={4}
          borderRadius="lg"
          _hover={{ bg: "whiteAlpha.200" }}
        >
          <ListIcon as={RepeatClockIcon} />
          Archive
        </Flex>
      </ListItem>
    </List>
  );
}
