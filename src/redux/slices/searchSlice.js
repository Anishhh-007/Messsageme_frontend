import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: '', // array of searched users
  reducers: {
    addSearch: (state, action) => {
      return action.payload
      // OR: return [...state, action.payload];
    },
    clearSearch: () => {
      return []; // clears history
    }
  }
});

export const { addSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
