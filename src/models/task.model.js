import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Incomplete", "Complete"],
      default: "Incomplete",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      required: false,
    },
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category'
    },
  },
  { timestamps: true }
);
export const Task = mongoose.model("Task", taskSchema);
