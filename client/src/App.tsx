import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import {
  AccountPage,
  ArchivePage,
  CreatePage,
  HomePage,
  NotFound,
  ProjectsPage,
  SigninPage,
  SignupPage,
  ViewPage,
} from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signin, signout } from "./store/authSlice";
import { AuthLayout, MainLayout, RootLayout } from "./layouts";
import { signup, signin as signinAction, updateUser } from "./actions";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} action={signinAction} />
        <Route path="signup" element={<SignupPage />} action={signup} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route path="projects">
          <Route index element={<ProjectsPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="archive" element={<ArchivePage />} />
          <Route path="view/:id" element={<ViewPage />} />
        </Route>
        <Route path="account" element={<AccountPage />} action={updateUser} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function run() {
      try {
        const res = await fetch("http://localhost:3000/api/users/account", {
          credentials: "include",
        });

        // console.log(res);
        if (res.ok) {
          const account = await res.json();
          dispatch(signin(account));
        } else {
          dispatch(signout());
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.error(error);
        }
        dispatch(signout());
      }
    })();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
