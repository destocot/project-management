import { Link, useRouteError } from "react-router-dom";

export default function ProjectNotFound() {
  const error = useRouteError();

  return (
    <div>
      <h2>404 Project Not Found</h2>
      <p>
        {error instanceof Error ? error.message : "Oops. Something went wrong."}
      </p>
      <Link to="/projects">Back to projects</Link>
    </div>
  );
}
