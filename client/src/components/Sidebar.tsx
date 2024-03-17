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

const links = [
  { href: "/account", label: "Account Details", icon: InfoOutlineIcon },
  { href: "/projects", label: "All Projects", icon: CalendarIcon },
  { href: "/create", label: "New Project", icon: EditIcon },
  { href: "/archive", label: "Archive", icon: RepeatClockIcon },
];

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
      flexWrap="wrap"
      justifyContent={{ base: "space-evenly", lg: "flex-start" }}
      alignItems={{ base: "center", lg: "flex-start" }}
      h="100%"
    >
      {links.map(({ href, label, icon }) => (
        <ListItem key={href}>
          <Flex
            as={NavLink}
            to={href}
            end
            p={{ base: 2, lg: 4 }}
            borderRadius="lg"
            _hover={{ bg: "whiteAlpha.200" }}
            whiteSpace="nowrap"
          >
            <ListIcon as={icon} />
            {label}
          </Flex>
        </ListItem>
      ))}
    </List>
  );
}
