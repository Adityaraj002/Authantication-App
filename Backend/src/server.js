import dotenv from 'dotenv';
import ConnectDb from './db/index.js';
import { app } from './app.js';
dotenv.config({
  path:"./env"
})

ConnectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running on port ${process.env.PORT}`)
    })

    app.on("error",(error) => {
      console.log("error ", error)
      throw error
    })
  })
  .catch((err) => {
    console.log("MongoDb connection failed !!! ",err);
  })
