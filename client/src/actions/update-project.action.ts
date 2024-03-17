import { validate } from "class-validator";
import * as toast from "@/components/toasts";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { Params } from "react-router-dom";
import { BASE_API_URL } from "@/lib/constants";

class UpdateProjectDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "Project title must be at least 6 characters" })
  public title: string;
}

const updateProjectAction = async ({
  params,
  request,
}: {
  params: Params<string>;
  request: Request;
}) => {
  const formData = await request.formData();

  const project = new UpdateProjectDto();
  project.title = formData.get("title") as string;

  const errors = await validate(project);
  if (errors.length > 0) {
    const error = errors[0].constraints;
    return toast.error(
      error ? error[Object.keys(error)[0]] : "Oops... Something went wrong"
    );
  }
  try {
    const res = await fetch(`${BASE_API_URL}/projects/${params.projectId}`, {
      method: "PATCH",
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

    return json;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }

  return toast.error("Oops... Something went wrong.");
};

export default updateProjectAction;
