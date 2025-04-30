import express from 'express';
import authCheck from '../middleware/authCheck.js';

import { adminLogin, loginUser, logoutUser, registerUser, sendMail, verifyVerificationUser, getProfileUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.post('/register', registerUser);

userRouter.post('/send-verification-mail', sendMail);

userRouter.post('/verify-otp', verifyVerificationUser);

userRouter.post('/admin-login', adminLogin);

userRouter.post('/profile/:id', authCheck, getProfileUser);

export default userRouter;