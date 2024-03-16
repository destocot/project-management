import { validate } from "class-validator";
import * as toast from "@/components/toasts";
import { BASE_API_URL } from "@/lib/constants";
import { store } from "@/store";
import { signin } from "@/store/authSlice";
import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

class SigninDto {
  @IsNotEmpty({ message: "Invalid email or password." })
  @IsString({ message: "Invalid email or password." })
  @IsEmail({}, { message: "Invalid email or password." })
  email: string;

  @IsNotEmpty({ message: "Invalid email or password." })
  @IsString({ message: "Invalid email or password." })
  @MinLength(6, { message: "Invalid email or password." })
  password: string;
}

const signinAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new SigninDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);
  if (errors.length > 0) return toast.error("Invalid email or password");

  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 200) {
      const json = await res.json();
      return store.dispatch(signin(json));
    }

    return toast.error("Invalid email or password");
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return toast.error("Oops... Something went wrong trying to signin.");
  }
};

export default signinAction;
