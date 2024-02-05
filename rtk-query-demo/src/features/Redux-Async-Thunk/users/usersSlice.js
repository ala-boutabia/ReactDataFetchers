import { createSlice } from "@reduxjs/toolkit";
import { createUserAsync, getUserAsync } from "./actions";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Get users
    builder.addCase(getUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.error.message;
    });
    // Add users
    builder.addCase(createUserAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
