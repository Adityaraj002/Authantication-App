import express from 'express';
import cookiesParser from 'cookie-parser'
import cors from 'cors';
import dotenv from 'dotenv'
// import multer from 'multer';

dotenv.config()


const app = express()
// const upload = multer();

app.use(cors({
  origin: process.env.ORIGIN_CORS,
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true
}))


app.use(express.json());

app.use(express.urlencoded({
  extended: true
}))

// app.use(upload.none());




app.use(express.static("public"))
app.use(cookiesParser())

import router from './routers/user.router.js';

app.use('/api/v1/user',router)


export {app}

