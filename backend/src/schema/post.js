import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    subTitle: { type: String, required: true },
    body: { type: String, required: true },
    keywords: { type: [String], default: [] },
    authorEmail: { type: String, required: true },
    authorName: { type: String, required: true },
    createdTime: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;
