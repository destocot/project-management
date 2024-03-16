import { validate } from "class-validator";
import * as toast from "../components/toasts";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { BASE_API_URL } from "../lib/constants";

class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "Project title must be at least 6 characters" })
  public title: string;
}

const createProjectAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const project = new CreateProjectDto();
  project.title = formData.get("title") as string;

  const errors = await validate(project);
  if (errors.length > 0) {
    const error = errors[0].constraints;
    return toast.error(
      error ? error[Object.keys(error)[0]] : "Oops... Something went wrong"
    );
  }

  try {
    const res = await fetch(`${BASE_API_URL}/projects`, {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();

    if (json.error) {
      const errorMessage = Array.isArray(json.message)
        ? json.message[0]
        : json.message;
      return toast.error(errorMessage);
    }

    if (json.id) {
      return { id: json.id };
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  return toast.error("Oops... Something went wrong.");
};

export default createProjectAction;
