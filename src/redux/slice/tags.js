import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../actions/posts";

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    isLoading: false,
    tag: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.tag = action.payload;
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
