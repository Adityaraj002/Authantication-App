import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const jwtToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.['accesstoken']
  console.log("token in jwtToken : ", req.cookies?.['accesstoken']);
  console.log("Cookies: ", req.cookies); // Log the cookies
  
  if (!token) {
    throw new ApiError(400,"token is not found")
  }

  try {
    const decode = jwt.verify(token, process.env.Access_Token_SECRET)
    const user = await User.findById(decode._id).select('-password -refreshToken')
    req.user = user
    next()
  } catch (error) {
    console.error("jwt toekn error is : ",error);
    throw new ApiError(400,"Authentication Failed")
  }
})
