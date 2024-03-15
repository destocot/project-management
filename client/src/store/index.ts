import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import featureReducer from "./featureSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Feature, Task } from "../lib/types";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["Features", "Tasks"],
  endpoints: (build) => ({
    featuresList: build.query<Array<Feature>, { projectId: string }>({
      providesTags: ["Features"],
      query({ projectId }) {
        return {
          url: `projects/${projectId}/features`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
    tasksList: build.query<
      Array<Task>,
      { projectId: string; featureId: string }
    >({
      providesTags: ["Tasks"],
      query({ projectId, featureId }) {
        return {
          url: `projects/${projectId}/features/${featureId}/tasks`,
          method: "GET",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useFeaturesListQuery, useTasksListQuery, util } = api;

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
