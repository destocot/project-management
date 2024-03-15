import { validate } from "class-validator";
import { UpdateUserDto } from "../lib/schemas";
import { BASE_API_URL } from "../lib/constants";

const updateUserAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new UpdateUserDto();
  user.email = formData.get("email") as string;
  user.currentPassword = formData.get("currentPassword") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    const error = errors[0].constraints;
    return {
      data: null,
      error: error
        ? error[Object.keys(error)[0]]
        : "Oops... Something went wrong",
    };
  } else {
    const res = await fetch(`${BASE_API_URL}/users/account/edit`, {
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
      return { error };
    }

    if (json.affected === 1) {
      return { data: { email: user.email, success: true } };
    }
  }

  return null;
};

export default updateUserAction;
