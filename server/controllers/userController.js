/**
 * Controller for Users
 */

import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import validator from "validator";

import getOTP from "../utils/generateOtp.js";
import sendVerificationMail from '../utils/sendingVerificationMail.js'
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";

import User from "../models/userSchema.js";

const loginUser = async( req, res ) => {
    try {
        const { name, email, password } = req.body;

        if ( ( !name && !email ) || !password ) {
            return res.status(400).json({
                success:false,
                message:"Incomplete Data",
            });
        }

        const orQuery = [];

        if ( email ) {
            orQuery.push({ email });
        } else if ( name ) {
            orQuery.push({ name });
        }

        const userExists = await User.findOne({
            $or: orQuery
        });

        if ( !userExists ) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if ( !userExists.isVerified ) {
            return res.status(404).json({
                success: false,
                message: "Email is not verified",
            });
        }
        
        const passwordCheck = await bcrypt.compare( password, userExists.password );

        if ( !passwordCheck ) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if ( 'user' != userExists.role ) {
            return res.status(401).json({
                success: false,
                message: "Not a user",
            });
        }

        const accessToken = await generateAccessToken( userExists._id );
        const refreshToken = await generateRefreshToken( userExists._id );
        
        return res
        .cookie( 'accessToken', accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: '/api',
        })
        .cookie( 'refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: '/api',
        })
        .status(201)
        .json({
            success: true,
            message: "User Logged In successfully",
        });
        
    } catch ( error ) {
        return res.status(500).json({
            success:false,
            message: error.message,
        });
    }
}

const getProfileUser = async( req, res ) => {
    const { id } = req.params;
    
    if ( !id ) {
        return res.status(401).json({
            success: false,
            message: 'Invalid User ID'
        });
    }

    const checkAuth = req.cookies.accessToken;
    const verifiedCheckAuth = jwt.verify( checkAuth, process.env.ACCESS_TOKEN_SECRET );
    const userId = verifiedCheckAuth.id;

    if ( id !== userId ) {
        return res.status(401).json({
            success: false,
            message: 'Not allowed to view Profile of another user'
        });
    }

    const user = await User.findById( id ).select('name email cart perferances isVerified role image'); ;

    if ( !user ) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    return res.status(201).json({
        success: true,
        userData: user,
    })
} 

const registerUser = async( req, res ) => {
    try {
        const { name, email, password } = req.body;

        if ( !name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        if ( ! validator.isEmail(email) ) {
            return res.status(400).json({
                success:false,
                message:"Invalid Email",
            });
        }

        if ( password.length < 8 ) {
            return res.status(400).json({
                success:false,
                message:"Weak Password, must be 8 digits",
            });
        } 

        const emailExists = await User.findOne({email});

        if ( emailExists ) {
            return res.status(409).json({
                success:false,
                message:"Email Already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = getOTP();

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationCode: otp,
        });

        const accessToken = generateAccessToken( user._id );
        const refreshToken = generateRefreshToken( user._id );

        res.cookie( 'accessToken', accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: '/api',
        });

        res.cookie( 'refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            path: '/api',
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
        });

    } catch ( error ) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const sendMail = async( req, res ) => {
    try {
        const { email } = req.body;

        const userExists = await User.findOne({ email });

        if ( ! userExists ) {
            return res.status(400).json({
                success: false,
                message: "Email does not exist"
            });
        }

        if ( userExists.isVerified ) {
            return res.status(200).json({
                success: true,
                message: "User already Verified"
            });
        }

        const timeNow = Date.now();

        var verificationCode;

        /** 
         * Verification Token is expired, its been 10 minutes.
         * 
         * Regenrate the Token.
         */
        if ( timeNow - userExists.verficationCodeCreatedAt > 10 * 60 * 1000 ) {
            verificationCode = getOTP();
            userExists.verificationCode = verificationCode;
            userExists.verficationCodeCreatedAt = Date.now();
            await userExists.save();
        }else {
            verificationCode = userExists.verificationCode;
        }

        sendVerificationMail( email, verificationCode, userExists.name );

        return res.status(200).json({
            success: true,
            message: "Verification OTP sent",
        });

    } catch ( error ) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const verifyVerificationUser = async( req, res ) => {
    const { verificationCode, email } = req.body;

    if ( !verificationCode || !email) {
        return res.status(400).json({
            success: false,
            message: "No verification Code provided",
        });
    }

    const userExists = await User.findOne( { email } );

    if ( !userExists ) {
        return res.status(404).json({
            success: false,
            message: "User not found!",
        })
    }

    if ( userExists.isVerified ) {
        return res.status(200).json({
            success:true,
            message: "User Verified"
        })
    }

    const timeNow = Date.now();

    /**
     * Optimize the cleanup by utilizing in build MongoDB expire property for simplicity.
     * 
     * To be Implemented.
     */
    if ( timeNow - userExists.verficationCodeCreatedAt > 10 * 60 * 1000 ) {
        return res.status(400).json({
            success: false,
            message: "Verification Code has expired"
        });
    }

    const savedCode = userExists.verificationCode;
    if ( savedCode != verificationCode ) {
        return res.status(404).json({
            success: false,
            message: "Invalid Verification Code",
        })
    }

    try {
        await userExists.updateOne({
            $unset: {
                verificationCode: 1,
                verficationCodeCreatedAt: 1
            },
            $set: {
                isVerified: true
            }
          });
    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

    return res.status(200).json({
        success: true,
        message: "User is verified"
    })
} 

const logoutUser = async( req, res ) => {
    
}

const adminLogin = async( req, res ) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(400).json({
                success:false,
                message: "No Email or Password provided",
            });
        }

        const userExists = await User.findOne({ email });

        if ( !userExists ) {
            return res.status(400).json({
                success: false,
                message: "Email does not exist"
            });
        }

        const passwordCheck = await bcrypt.compare( password, userExists.password );

        if ( !passwordCheck ) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if ( 'admin' != userExists.role ) {
            return res.status(401).json({
                success: false,
                message: "Not an Admin",
            });
        }

        res.status(200).json({
            success:true,
            message:userExists,
        });

    } catch ( error ) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    loginUser,
    registerUser,
    logoutUser,
    adminLogin,
    sendMail,
    verifyVerificationUser,
    getProfileUser,
}