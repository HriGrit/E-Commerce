/**
 * Implementing a Stateless Approach
 * 
 * Fetching Access Token from request via Cookies
 * Using httpOnly Cookies to make it inaccesibile to JS
 */
import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

const authCheck = async( req, res, next ) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    try {
        const verifiedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        
        const userId = verifiedAccessToken.id;
        const userRole = verifiedAccessToken.role;

        if ( 'user' !== userRole || !userId ) {
            return res.status(404).json({
                success: false,
                message: "Invalid Token"
            });
        } 
        
        const user = await User.findById( userId  );
        
        if ( !user ) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            });
        }

        if ( !user.isVerified ) {
            return res.status(404).json({
                success: false,
                message: "User not Verified"
            });
        }

        next();
    } catch ( error ) {
        if ( 'TokenExpiredError' != error.name ) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
                error_message: error.message,
            });
        }
    }
}

export default authCheck;