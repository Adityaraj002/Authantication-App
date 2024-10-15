import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { boolean } from "zod";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase:true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    isVerified: {
      type: boolean,
      default:false
    }
  },
  password: {
    type: String,
    required:true
  },
  phoneNo: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        // A simple regex for validating Indian phone numbers (10 digits)
        return /^[6-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    isVerified: {
      type: boolean,
      default:false
    }
  },
  profile: {
    type: String,
    required:true
  },
  refreshToken: {
    type:String
  }
}, { timestamps: true })

userSchema.path('phoneNo').validate(function validatePhone() {
  return ( this.phoneNo > 999999999 );
}); 


userSchema.pre('save',async function (next) {
  if (!this.isModified('password')) return next();
  // console.log("password is here : ",this.password)

  this.password = await bcrypt.hash(this.password, 10);
  // console.log("password is here : ",this.password)

  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
  // console.log("Generating access token...");
  // console.log("Access Token Secret:", process.env.Access_Token_SECRET);
  // console.log("Access Token Expiration:", process.env.Access_Token_EXPIRED);
  return jwt.sign(
    {
      _id : this._id,
      email: this.email,
      fullName: this.fullName,
      username: this.username,
    },
    process.env.Access_Token_SECRET,
    {
      expiresIn: process.env.Access_Token_EXPIRED
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  // console.log("Generating refresh token...");
  // console.log("Refresh Token Secret:", process.env.REFRESH_TOKEN_SECRET);
  // console.log("Refresh Token Expiration:", process.env.REFRESH_TOKEN_EXPIRED);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRED
    }
  )
}

export const User = mongoose.model('User',userSchema)