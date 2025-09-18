
import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
  name: "friends",
  initialState: [], // array of searched users
  reducers: {
    addFriends: (state, action) => {
      return action.payload
      },
    clearFriends: () => {
      return []; // clears history
    }
  }
});

export const { addFriends, clearFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
