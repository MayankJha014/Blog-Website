import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk("getAllPosts", async () => {
  try {
    const res = await axios.get(`${process.env.URL}/database`);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const getPostTitle = createAsyncThunk("getPostTitle", async (postId) => {
  try {
    const res = await axios.get(`${process.env.URL}/title/${postId}`);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const getPageData = createAsyncThunk("getPageData", async (postId) => {
  try {
    const res = await axios.get(`${process.env.URL}/page/${postId}`);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const getComment = createAsyncThunk("getComment", async (postId) => {
  try {
    const res = await axios.get(`${process.env.URL}/comment/${postId}`);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const getTags = createAsyncThunk("getTags", async () => {
  try {
    const res = await axios.get(`${process.env.URL}/tags`);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const postComment = async (formData) => {
  try {
    const res = await axios.post(`${process.env.URL}/comment`, formData);
    console.log(res);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = createAsyncThunk("getUser", async () => {
  try {
    const res = await axios.get(`${process.env.URL}/user`);
    console.log(res);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const searchPost = createAsyncThunk("searchPost", async (search) => {
  try {
    const res = await axios.get(`${process.env.URL}/search/${search}`);
    console.log(res);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
});

export const tagsPosts = createAsyncThunk("tagsPosts", async (search) => {
  try {
    const res = await axios.get(`${process.env.URL}/tags/search/${search}`);
    console.log(res);
    if (res.status != 200) {
      throw new Error(res.error);
    }
    console.log(res);
    return res;
  } catch (error) {
    throw new Error(error);
  }
});
