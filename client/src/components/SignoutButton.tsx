import { Button } from "@chakra-ui/react";
import { signout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "./toasts";
import { BASE_API_URL } from "../lib/constants";

export default function SignoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    const res = await fetch(`${BASE_API_URL}/auth/signout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      dispatch(signout());
      navigate("/", { replace: true });
      successToast("Good-bye!");
    } else {
      errorToast("Oops. Something went wrong while trying to signout.");
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
