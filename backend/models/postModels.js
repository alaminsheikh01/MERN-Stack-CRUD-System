const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 150,
      required: true,
    },
    slug: {
      type: String,
      uniqe: true,
      index: true,
      lowerCase: true,
    },
    content: {
      type: {},
      requied: true,
      min: 20,
      max: 200000,
    },
    user: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostModel", postSchema);
