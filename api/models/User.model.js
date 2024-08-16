// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profilePicture: {
//       type: String,
//       default:
//         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   //   timestamps will help to saved the two thing while adding the new user the time of creation and time of update
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     profilePicture: {
//       type: String,
//       default:
//         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     },
//     isAdmin: {
//       type: Boolean,
//       default: false,
//     },
//     // New fields for account lockout mechanism
//     failedLoginAttempts: {
//       type: Number,
//       default: 0,
//     },
//     isLocked: {
//       type: Boolean,
//       default: false,
//     },
//     lockUntil: {
//       type: Date,
//     },
//   },
//   // timestamps will help to save the creation and update time of the user
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;

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
    passwordHistory: {
      type: [String], // Array of hashed passwords
      default: [],
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now,
    },
    passwordExpiry: {
      type: Date,
    },
    profilePicture: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Method to check if the password is expired
userSchema.methods.isPasswordExpired = function () {
  return this.passwordExpiry < new Date();
};

const User = mongoose.model("User", userSchema);

export default User;
