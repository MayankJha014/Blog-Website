import { configureStore } from "@reduxjs/toolkit";
import { commentSlice } from "./slice/comment";
import { titleSlice } from "./slice/title";
import { pageDataSlice } from "./slice/pageData";
import { postSlice } from "./slice/posts";
import { tagSlice } from "./slice/tags";
import { userSlice } from "./slice/users";

const store = configureStore({
  reducer: {
    comments: commentSlice.reducer,
    title: titleSlice.reducer,
    tags: tagSlice.reducer,
    pageData: pageDataSlice.reducer,
    posts: postSlice.reducer,
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
