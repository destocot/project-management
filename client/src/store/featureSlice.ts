import { createSlice } from "@reduxjs/toolkit";

export type FeatureState = {
  featureId: string | null;
};

const initialState: FeatureState = {
  featureId: null,
};

const featureSlice = createSlice({
  name: "feature",
  initialState,
  reducers: {
    selectFeature: (state, action) => {
      state.featureId = action.payload.featureId;
    },
  },
});

export default featureSlice.reducer;
export const { selectFeature } = featureSlice.actions;
