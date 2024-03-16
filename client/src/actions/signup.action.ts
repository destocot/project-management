import { validate } from "class-validator";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { store } from "@/store";
import { signin } from "@/store/authSlice";

class SignupDto {
  @IsNotEmpty({ message: "Email is required." })
  @IsString({ message: "Email must be a valid format." })
  @IsEmail({}, { message: "Email must be a valid format." })
  email: string;

  @IsNotEmpty({ message: "Password is required." })
  @IsString({ message: "Password must be a string." })
  @MinLength(6, { message: "Password must be at least 6 characters." })
  password: string;
}

const signupAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new SignupDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    const error = errors[0].constraints;
    return toast.error(
      error ? error[Object.keys(error)[0]] : "Oops... Something went wrong"
    );
  }

  try {
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();
    if (res.status === 201) {
      return store.dispatch(signin(json));
    }

    return toast.error(
      json.error ? json.message : "Oops... Something went wrong"
    );
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return toast.error("Oops... Something went wrong trying to signup.");
  }
};

export default signupAction;
