import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret:process.env.CLOUDINARY_SECRET
})

const CloudinaryUplaod = async (localPath) => {
  try {
    if (!localPath) return null

    // console.log("the local path is : ",localPath)
    const response = await cloudinary.uploader.upload(localPath, {
      resource_type:'auto'
    })

    // console.log("file is uploaded on Cloudinary : ", response.url);
    fs.unlinkSync(localPath)
    return response
    
  } catch (error) {
    fs.unlinkSync(localPath)
    return null
  }
}



const CloundinaryDelete = async (localPath) => {
  try {
    if (!localPath) return null;
    const response = await cloudinary.uploader.destroy(localPath)
    return response
  } catch (error) {
    console.log("Error deleting from Cloudinary !! :  ", error)
    return null
  }
}
export {
  CloudinaryUplaod,
  CloundinaryDelete
}