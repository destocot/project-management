import { validate } from "class-validator";
import { BASE_API_URL } from "../lib/constants";
import {
  IsString,
  IsEmail,
  MinLength,
  IsOptional,
  ValidateIf,
} from "class-validator";
import * as toast from "@/components/toasts";

class UpdateUserDto {
  @IsString({ message: "Email must be a valid format." })
  @IsEmail({}, { message: "Email must be a valid format." })
  @IsOptional()
  email?: string;

  @IsString({ message: "Password must be a string." })
  @MinLength(6, { message: "Password must be at least 6 characters." })
  @IsOptional()
  password?: string;

  @IsString({ message: "Password must be a string." })
  @MinLength(6, { message: "Password must be at least 6 characters." })
  @ValidateIf((o) => o.password?.length >= 6)
  currentPassword: string;
}

const updateUserAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new UpdateUserDto();
  user.email = formData.get("email") as string;
  user.currentPassword = formData.get("currentPassword") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    const error = errors[0].constraints;
    return toast.error(
      error ? error[Object.keys(error)[0]] : "Oops... Something went wrong"
    );
  }

  try {
    const res = await fetch(`${BASE_API_URL}/users/account`, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();

    if (json.error) {
      const error = json.message ?? "Oops... Something went wrong";
      return toast.error(error);
    }

    if (json.affected === 1) return { email: user.email, success: true };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
  return toast.error("Oops... Something went wrong.");
};

export default updateUserAction;
