import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  authenticated: boolean | null;
  acc_id: string | null;
  acc_email: string | null;
};

const initialState: AuthState = {
  authenticated: null,
  acc_id: null,
  acc_email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.authenticated = true;
      state.acc_id = action.payload.id;
      state.acc_email = action.payload.email;
    },
    signout: (state) => {
      Object.assign(state, initialState);
      state.authenticated = false;
    },
    update: (state, action) => {
      state.acc_email = action.payload ?? state.acc_email;
    },
  },
});

export default authSlice.reducer;
export const { signin, signout, update } = authSlice.actions;
