import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import CommentRoutes from "./routes/comment.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// this will helps to allow as an Input send json data from the backend
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// we are use to get request from userRoutes so, we used use
app.use("/api/user", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/post", postRoutes);

app.use("/api/comment", CommentRoutes);

// middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
