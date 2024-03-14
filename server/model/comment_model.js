import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CommentSchema = mongoose.model("comment", commentSchema);

export default CommentSchema;
