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
  ProjectDetailsPage,
  ProjectNotFound,
} from "./pages";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signin, signout } from "./store/authSlice";
import { AuthLayout, MainLayout, RootLayout } from "./layouts";
import {
  signupAction,
  signinAction,
  updateUserAction,
  createProjectAction,
  updateProjectAction,
  archiveProjectAction,
} from "./actions";
import { BASE_API_URL } from "./lib/constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/" element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} action={signinAction} />
        <Route path="signup" element={<SignupPage />} action={signupAction} />
      </Route>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="create"
          element={<CreatePage />}
          action={createProjectAction}
        />
        <Route path="projects" action={archiveProjectAction}>
          <Route index element={<ProjectsPage />} />
          <Route
            path=":projectId"
            element={<ProjectDetailsPage />}
            action={updateProjectAction}
            errorElement={<ProjectNotFound />}
          />
        </Route>
        <Route
          path="archive"
          element={<ArchivePage />}
          action={archiveProjectAction}
        />
        <Route
          path="account"
          element={<AccountPage />}
          action={updateUserAction}
        />
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
        const res = await fetch(`${BASE_API_URL}/users/account`, {
          credentials: "include",
        });

        if (res.ok) {
          const account = await res.json();
          dispatch(signin(account));
        } else {
          dispatch(signout());
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
        dispatch(signout());
      }
    })();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
