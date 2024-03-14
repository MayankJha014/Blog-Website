import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, searchPost, tagsPosts } from "../actions/posts";

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    post: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
    builder.addCase(searchPost.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(searchPost.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(searchPost.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
    builder.addCase(tagsPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(tagsPosts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(tagsPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
