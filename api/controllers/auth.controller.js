// This will eb asynchronous because we need to some times to actually to get the results from the mongodb
// because we are signing up the user it takes time we need to wait for that and then we will send the response to the user
// so, it should be synchronous because we want to create it.

import bcryptjs from "bcryptjs";
import User from "../models/User.model.js";

export const signup = async (req, res) => {
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
    return res.status(400).json({ mesaage: "All fields are required" });
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
    res.status(500).json({ message: error.message });
  }
};
