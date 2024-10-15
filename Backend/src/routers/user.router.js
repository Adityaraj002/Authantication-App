import  { Router } from 'express'
import { jwtToken } from '../middlewares/auth.middleware.js';
import { signin, signup,logout,user } from "../controllers/user.controller.js"
import { singleAvatar } from '../middlewares/multer.middleware.js'
import { AuthorizationJwtToken } from '../middlewares/jwtAuthori.middleware.js';

const router = Router();

// console.log("Not getting error")

router.route('/signup').post(singleAvatar, signup)

router.route('/signin').post(signin)

// console.log(" getting error")

router.route('/logout').post(jwtToken, logout)

//to get user  data 
router.route('/user').get(AuthorizationJwtToken,user)





export default router