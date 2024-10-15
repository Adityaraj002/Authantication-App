import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

export const AuthorizationJwtToken = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")

  if (!token) {
    throw new ApiError(401,"Unauthorized Http, token not provided")
  }
    
  const jwtToken = token.replace("Bearer", "").trim()
  // console.log("toekn is authorization ", jwtToken);
  
  try {
    const isVerfied = jwt.verify(jwtToken, process.env.Access_Token_SECRET)
    
    const userData = await User.findOne({ email: isVerfied.email }).select("-password -refreshToken") ;
    console.log("userdata ", userData)

    req.user = userData
    // console.log("req.user : ",req.user)
    req.token = token
    // console.log("token : ",req.token)

    req.userID = userData._id 
    // console.log("req.userId : ",req.userID)
    
  } catch (error) {
    console.error("jwt toekn error is : ",error);
    throw new ApiError(400,"Authorization Failed")
  }  
  next()
})