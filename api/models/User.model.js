import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  //   timestamps will help to saved the two thing while adding the new user the time of creation and time of update
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
