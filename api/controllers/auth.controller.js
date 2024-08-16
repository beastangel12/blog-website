// This will eb asynchronous because we need to some times to actually to get the results from the mongodb
// because we are signing up the user it takes time we need to wait for that and then we will send the response to the user
// so, it should be synchronous because we want to create it.

import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // console.log(req.body)
  // instead of console.log I want to save database/ we can just get the information like we can crate a constant and D structure the username ,email, and password.
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorhandler(400, "All fields are required"));
  }

  // password which we are getting from the request.body and 10 is number of round for salt which is going to be mix with our password and make it secure.
  const hashedPassword = bcryptjs.hashSync(password, 10);

  //   Aaba xhai nayauser banauna ko lagi tyo xhai User.model ma j lekhya cha tei tannu parcha yesma like user.model.js ma xhai User cha so teslai nai tannu parcha yesma

  const newUser = new User({
    // username: username,
    // actually username ko key ra value same cha so tei vayera eutai rakhya
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({ message: "signup successful" });
  } catch (error) {
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password || email === "" || password === "") {
//     next(errorhandler(400, "All fields are required"));
//   }

//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorhandler(404, "User not found"));
//     }
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next(errorhandler(400, "Invalid password"));
//     }
//     const token = jwt.sign(
//       {
//         id: validUser._id,
//         isAdmin: validUser.isAdmin,
//       },
//       process.env.JWT_SECRET
//     );

//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// locked
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const MAX_FAILED_ATTEMPTS = 5; // Number of failed attempts before lockout
  const LOCK_TIME = 30 * 60 * 1000; // Lock account for 30 minutes

  if (!email || !password || email === "" || password === "") {
    return next(errorhandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorhandler(404, "User not found"));
    }

    // Check if the account is locked
    if (user.isLocked) {
      if (new Date() > user.lockUntil) {
        // Unlock account if lock time has passed
        user.isLocked = false;
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();
      } else {
        return next(
          errorhandler(
            403,
            `Account is locked. Try again after ${Math.ceil(
              (user.lockUntil - new Date()) / (60 * 1000)
            )} minutes.`
          )
        );
      }
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      // Increment failed login attempts
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        // Lock the account if max attempts are reached
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        await user.save();
        return next(
          errorhandler(
            403,
            `Account is locked due to too many failed login attempts. Try again after ${
              LOCK_TIME / (60 * 1000)
            } minutes.`
          )
        );
      }

      await user.save();
      return next(errorhandler(400, "Invalid password"));
    }

    // Reset failed login attempts on successful login
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.lockUntil = undefined;
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// next is for the error
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
