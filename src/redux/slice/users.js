import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../actions/posts";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    user: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
