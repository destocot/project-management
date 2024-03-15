import { ActionFunctionArgs, Params, ParamParseKey } from "react-router-dom";
import { BASE_API_URL } from "../lib/constants";

const PathNames = {
  projectDetails: "/projects/view/:id",
} as const;

interface Args extends ActionFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.projectDetails>>;
}

export default async function projectDetailsLoader({ params }: Args) {
  const { id } = params;
  const response = await fetch(`${BASE_API_URL}/projects/${id}`, {
    credentials: "include",
  });

  if (response.status === 404) {
    throw new Error("You do not have access to this project.");
  }

  return response.json();
}
