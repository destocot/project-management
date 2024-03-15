import { BASE_API_URL } from "../lib/constants";

export default async function projectsLoader() {
  const response = await fetch(`${BASE_API_URL}/projects`, {
    credentials: "include",
  });
  return response.json();
}
