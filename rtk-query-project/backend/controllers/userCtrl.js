import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

/*****************************************
 * @Title create new user
 * @route POST /api/users
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
  // To test the custom error middleware:
  /*
  res.status(401);
  throw new Error("something went wrong");
  */
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(401).json({ message: "All fields are required" });
  }
  // Check if the user already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Create the user
  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    const { password, ...returnedUser } = user._doc;
    res.status(201).json(returnedUser);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/*****************************************
 * @Title Authenticate user / set token
 * @route POST /api/users/auth
 * @access public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  // Match user entered password to hashed password in database
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    res.status(401);
    throw new Error("Wrong credentials");
  }
  if (user && matchPassword) {
    generateToken(res, user._id);
    res.status(201).json({
      name: user.name,
      email: user.email,
    });
  }
});

/*****************************************
 * @Title Logout User
 * @route POST /api/users/logout
 * @access private
 */
const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "You logget out " });
});

/*****************************************
 * @Title Get user profile
 * @route GET /api/users/profile
 * @access private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

/*****************************************
 * @Title Update user profile
 * @route PUT /api/users/profile
 * @access private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
};
