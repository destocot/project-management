import { successToast, errorToast } from "../components/toasts";
import { BASE_API_URL } from "../lib/constants";

const softDeleteProjectAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const projectId = formData.get("projectId") as string;

  if (!projectId) {
    return errorToast("Oops... Something went wrong");
  }

  try {
    const res = await fetch(
      `${BASE_API_URL}/projects/${projectId}/soft-delete`,
      { method: "PATCH", credentials: "include" }
    );

    const json = await res.json();

    if (json.error) {
      const errorMessage = Array.isArray(json.message)
        ? json.message[0]
        : json.message;
      return errorToast(errorMessage);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return errorToast("Oops... Something went wrong.");
  }

  return successToast("Project status updated.");
};

export default softDeleteProjectAction;
