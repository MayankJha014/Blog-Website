import { createSlice } from "@reduxjs/toolkit";
import { getPostTitle } from "../actions/posts";

export const titleSlice = createSlice({
  name: "title",
  initialState: {
    isLoading: false,
    title: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPostTitle.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPostTitle.fulfilled, (state, action) => {
      state.isLoading = false;
      state.title = action.payload;
    });
    builder.addCase(getPostTitle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
