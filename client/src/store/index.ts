import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import featureReducer from "./featureSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Feature, Project, Task } from "../lib/types";
import { BASE_API_URL } from "@/lib/constants";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  tagTypes: ["Projects", "Features", "Tasks"],
  endpoints: (build) => ({
    projectsList: build.query<Array<Project>, void>({
      query() {
        return {
          url: "projects",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Projects"],
    }),
    projectDetails: build.query<Project, { projectId: string }>({
      query({ projectId }) {
        return {
          url: `projects/${projectId}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: (_result, _error, args) => [
        { type: "Projects", id: args.projectId },
      ],
    }),
    archivedProjectsList: build.query<Array<Project>, void>({
      query() {
        return {
          url: "projects/archived",
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Projects"],
    }),
    featuresList: build.query<Array<Feature>, { projectId: string }>({
      query({ projectId }) {
        return {
          url: `projects/${projectId}/features`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Features"],
    }),
    tasksList: build.query<
      Array<Task>,
      { projectId: string; featureId: string }
    >({
      query({ projectId, featureId }) {
        return {
          url: `projects/${projectId}/features/${featureId}/tasks`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useProjectsListQuery,
  useProjectDetailsQuery,
  useArchivedProjectsListQuery,
  useFeaturesListQuery,
  useTasksListQuery,
  util,
} = api;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feature: featureReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
