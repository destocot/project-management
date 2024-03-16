import { store, util } from "@/store";
import * as toast from "../components/toasts";
import { BASE_API_URL } from "../lib/constants";

const softDeleteProjectAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const projectId = formData.get("projectId") as string;

  if (!projectId) {
    return toast.error("Oops... Something went wrong");
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
      return toast.error(errorMessage);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    return toast.error("Oops... Something went wrong.");
  }

  store.dispatch(util.invalidateTags(["Projects"]));
  return toast.success("Project status updated.");
};

export default softDeleteProjectAction;
