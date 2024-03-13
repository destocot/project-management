import { validate } from "class-validator";
import { SignupDto } from "../lib/schemas";

const signin = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new SignupDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    const error = errors[0].constraints;
    return {
      data: null,
      error: error
        ? "Invalid email or password"
        : "Oops... Something went wrong",
    };
  } else {
    const res = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (json.error) {
      return { error: "Invalid email or password" };
    }

    if (json.data) {
      return { data: json.data };
    }
  }

  return null;
};

export default signin;
