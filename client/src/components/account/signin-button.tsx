import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SigninButon() {
  return (
    <Button colorScheme="blue" as={Link} to="/signin">
      Sign In
    </Button>
  );
}
