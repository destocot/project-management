import { Button } from "@chakra-ui/react";
import { signout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as toast from "../toasts";
import { BASE_API_URL } from "../../lib/constants";
import { util } from "@/store";

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
      dispatch(util.resetApiState());
      navigate("/", { replace: true });
      toast.success("Good-bye!");
    } else {
      toast.error("Oops. Something went wrong while trying to signout.");
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
