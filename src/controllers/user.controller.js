import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const Signupcontroller = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim === ""))
    throw new ApiError(400, "All feilds are required ");
  const user = await User.create({
    name,
    email,
    password,
  });
  if (!user) {
    throw new ApiError(500, "Internal server error while creating the user");
  }
  return res.status(200).json(new ApiResponse(200, user, "User created successfully"));
});

export const Signincontroller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "All Fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User not exist with this email");
  }

  const correctPassword = user.isPasswordCorrect(password);
  if (!correctPassword) {
    throw new ApiError(409, "Ivalid User Credintials");
  }
  const token = generateToken(user._id, user.name, user.email);
  if (!token) {
    throw new ApiError(409, "Unable to generate token");
  }
  const options = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 25892000000),
  };

  return res
    .status(201)
    .cookie("token", token, options)
    .json(new ApiResponse(201, user, "User Signin successfully"));
});

export const Signoutcontroller = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(409, "You are not Signined");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, "User Signout successfully"));
});
