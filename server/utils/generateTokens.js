/**
 * Generating Access and Refresh JWT Tokens
 * 
 * Access Token is for validating a User request and valid for 15 minutes
 * Refresh Token is to regenerate the Access Token - Refresh Token Pair and valid for 7 Days
 * 
 * To be stored in HTTP Only Cookies
 */
import jwt from 'jsonwebtoken';

const generateAccessToken = async ( id, role = 'user' ) => {

    return (
        jwt.sign({id, role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
        })
    );

}

const generateRefreshToken = async ( id, role = 'user' ) => {
    
    return (
        jwt.sign({id, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
        })
    );

}

export {
    generateAccessToken,
    generateRefreshToken,
}