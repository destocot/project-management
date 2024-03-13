import { validate } from "class-validator";
import { UpdateUserDto } from "../lib/schemas";

const updateUser = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const user = new UpdateUserDto();
  user.email = formData.get("email") as string;
  user.password = formData.get("password") as string;

  const errors = await validate(user);

  if (errors.length > 0) {
    console.log(errors);
  } else {
    const res = await fetch("http://localhost:3000/api/users/account/edit", {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (res.ok) {
      //   const json = await res.json();
      return new Response(JSON.stringify({ data: user.email }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("[Error]: " + JSON.stringify(await res.json()));
    }
  }

  return null;
};

export default updateUser;
