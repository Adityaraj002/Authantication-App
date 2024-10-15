import mongoose from 'mongoose';
import { DB_Name } from '../constent.js';

const ConnectDb = async ()=>{
  try {
    const ConnectInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`)
    console.log(`\n MongoDB connected !! DB Host ${ConnectInstance.connection.host}`)
  } catch (err) {
    console.log(`\n MongoDB connection Is Failed `, err)
    process.exit(1)
  }
}

export default ConnectDb