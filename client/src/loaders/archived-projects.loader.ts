import { BASE_API_URL } from "../lib/constants";

export default async function archivedProjectsLoader() {
  const response = await fetch(`${BASE_API_URL}/projects/archived`, {
    credentials: "include",
  });
  return response.json();
}
