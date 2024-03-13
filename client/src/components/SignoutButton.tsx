import { Button } from "@chakra-ui/react";
import { signout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SignoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    const res = await fetch("http://localhost:3000/api/auth/signout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      dispatch(signout());
      navigate("/", { replace: true });
    } else {
      console.log("[Error]: SignoutButton > handleClick");
    }
  };

  return (
    <Button
      colorScheme="blue"
      variant="outline"
      _hover={{ bg: "blue.600", color: "white" }}
      onClick={handleClick}
    >
      Sign Out
    </Button>
  );
}
