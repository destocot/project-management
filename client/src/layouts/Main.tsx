import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { Spinner } from "@chakra-ui/react";

export default function MainLayout() {
  const authenticated = useSelector(
    ({ auth }: RootState) => auth.authenticated
  );

  if (authenticated === null) {
    return <Spinner />;
  }

  if (authenticated === false) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
}
