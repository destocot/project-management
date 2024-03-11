import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  userId: string | null;
};

const initialState: AuthState = {
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.userId = action.payload.userId;
    },
    signout: (state) => {
      state.userId = null;
    },
  },
});

export default authSlice.reducer;
export const { signin, signout } = authSlice.actions;
