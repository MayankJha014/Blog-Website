import { createSlice } from "@reduxjs/toolkit";
import { getComment } from "../actions/posts";

export const commentSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    comment: null,
    isError: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.messageData = null;
    },
    addCommentData: (state, action) => {
      console.log(action.payload);
      state.comment.push(action.payload.data);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload.data;
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  },
});

export const { clearMessage, addCommentData } = commentSlice.actions;
