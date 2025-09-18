
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [], // array of searched users
  reducers: {
    addRequest: (state, action) => {
      return action.payload
      // OR: return [...state, action.payload];
    },
    clearRequest: () => {
      return []; // clears history
    }
  }
});

export const { addRequest, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;
