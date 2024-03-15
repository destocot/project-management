import { validate } from "class-validator";
import { SignupDto } from "../lib/schemas";
import { errorToast } from "../components/toasts";
import { BASE_API_URL } from "../lib/constants";

const signinAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new SignupDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);
  if (errors.length > 0) {
    return errorToast("Invalid email or password");
  }

  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (json.error) {
      return errorToast("Invalid email or password");
    }

    if (json.data) {
      return { data: json.data };
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return errorToast("Oops... Something went wrong.");
  }

  return errorToast("Oops... Something went wrong.");
};

export default signinAction;
