import { createSlice } from "@reduxjs/toolkit";

const targetIDSlice = createSlice({
  name: "id",
  initialState: {},  // ✅ start with an empty object
  reducers: {
    addTargetID: (state, action) => {
      return action.payload; // replace state with new object
    },
    clearTargetID: () => {
      return {};
    }
  }
});

export const { addTargetID, clearTargetID } = targetIDSlice.actions;
export default targetIDSlice.reducer;
