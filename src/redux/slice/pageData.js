import { createSlice } from "@reduxjs/toolkit";
import { getPageData } from "../actions/posts";

export const pageDataSlice = createSlice({
  name: "pageData",
  initialState: {
    isLoading: false,
    pageData: null,
    isError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getPageData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPageData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pageData = action.payload;
    });
    builder.addCase(getPageData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});
