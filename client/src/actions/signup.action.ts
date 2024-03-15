import { validate } from "class-validator";
import { SignupDto } from "../lib/schemas";
import { errorToast } from "../components/toasts";
import { BASE_API_URL } from "../lib/constants";

const signupAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new SignupDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    const error = errors[0].constraints;
    return errorToast(
      error ? error[Object.keys(error)[0]] : "Oops... Something went wrong"
    );
  } else {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (json.error) {
      return errorToast(json.message);
    }

    if (json.data) {
      return { data: json.data };
    }
  }

  return errorToast("Oops... Something went wrong.");
};

export default signupAction;
