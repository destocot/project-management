import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { NotFound, ProjectsPage, SigninPage, SignupPage } from "./pages";
import RootLayout from "./layouts/Root";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signin, signout } from "./store/authSlice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function run() {
      const res = await fetch(
        "http://localhost:3000/api/users/overcompensate",
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        dispatch(signin({ userId: "A00500" }));
      } else {
        dispatch(signout());
      }
    })();
  }, [dispatch]);

  return (
    <ChakraProvider resetCSS>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
