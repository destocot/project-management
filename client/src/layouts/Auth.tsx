import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { Spinner } from "@chakra-ui/react";

export default function AuthLayout() {
  const authenticated = useSelector(
    ({ auth }: RootState) => auth.authenticated
  );

  if (authenticated === null) {
    return <Spinner />;
  }

  if (authenticated === true) {
    return <Navigate to="/projects" replace={true} />;
  }

  return <Outlet />;
}
