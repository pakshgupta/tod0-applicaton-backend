import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();
const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/todo-application`)
    .then((e) => console.log("mongodb connected sccessfully"))
    .catch((error) => console.error(error));
};
connectDB().then(() =>
  app.listen(process.env.PORT || 4000, () =>
    console.log("app is running at port no.", process.env.PORT)
  )
);
