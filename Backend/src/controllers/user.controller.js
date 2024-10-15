// import mongoose from 'mongoose'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { CloudinaryUplaod } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefraceToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    // console.log("user in generateAccessAndRefraceToken ", user);
    
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // console.log("refreshToken ==> ", refreshToken);
    // console.log("accessToken ==> ", accessToken);

    // console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
    // console.log("Refresh Token Secret:", process.env.REFRESH_TOKEN_SECRET);

    return { refreshToken, accessToken };
  } catch (error) {
    console.error("Error in generating tokens: ", error);
    throw new ApiError(500, "something went wrong while genrating token");
  }
};

//register
const signup = asyncHandler(async (req, res) => {
  try {
    const { username, fullName, password, email, phoneNo } = req.body;
    // console.log("req.body in signup===> : ", req.body);
    // console.log("conform password : ", conformPassword);

    if (
      [fullName, username, email, password, phoneNo].some(
        (field) => field?.trim() == ""
      )
    ) {
      throw new ApiError(400, "Please enter the credentials carefully");
    }
    // console.log("user profile : ", User.profile)

    const userexsit = await User.findOne({
      $or: [{ username }, { email }, { phoneNo }],
    });

    if (userexsit) {
      console.error("error is ", userexsit);
      throw new ApiError(
        400,
        "User with email, username, or phone number already exists"
      );
    }
    // console.log("=====> : ", req.file);

    // const localProfile = req.files?.profile?.[0]?.path;
    // console.log("localProfile : ", localProfile)

    let localProfile;
    if (req.file && req.file.path) {
      localProfile = req.file.path;
      // console.log("localProfile (profile picture path):", localProfile);
    } else {
      // No file was uploaded or there was an issue
      // console.log("Error: Profile picture is missing or not uploaded correctly");
      throw new ApiError(400, "Profile picture is required");
    }

    if (!localProfile) {
      throw new ApiError(400, "Profile picture is required");
    }

    const profileTo = await CloudinaryUplaod(localProfile);
    if (!profileTo) {
      throw new ApiError(400, "Profile upload failed");
    }

    const user = await User.create({
      fullName,
      username: username.toLowerCase(),
      email,
      password,
      phoneNo,
      profile: profileTo.url,
    });

    const createuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createuser) {
      throw new ApiError(400, "something went wrong while creating account");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, createuser, "User created successfully",{success:true}));
  } catch (error) {
     console.error(error); // Log the error to the server console
     res.status(500).json({ error: "Something went wrong" });
  }
});

const option = {
  httpOnly: true,
  secure: true,
};

// log in
const signin = asyncHandler(async (req, res) => {
  const { email,  password } = req.body;
  // console.log("Headers: ", req.headers);
  // console.log("Body: ", req.body);

  // console.log("=>  :  ", req.body);

  if (!email) {
    throw new ApiError(400, " email is required");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  // console.log("user is : ", user);

  if (!user) {
    throw new ApiError(401, "Username or password is missing");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  // console.log("isPasswordValid ==> ", isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "plase check password again");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefraceToken(
    user._id
  );
  // console.log("accessToken : ", accessToken);

  const logInuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accesstoken", accessToken, option)
    .cookie("refreshtoken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: logInuser,
          accessToken,
          refreshToken,
        },
        "user login success fully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  // console.log("req.user in logout : ", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  // console.log("User is log out");

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "User logout "));
});

const user = asyncHandler(async (req, res) => {
  try {
    const userData = req.user
    // console.log(userData);
    return res.status(200).json(new ApiResponse(200,userData,"user data have been sended"))   
  } catch (error) {
    console.error(`error from user route ${error}`);
    
  }
})

export { signup, signin, logout, user };
