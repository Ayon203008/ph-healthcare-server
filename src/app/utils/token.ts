import { JwtPayload, SignOptions } from "jsonwebtoken";
import { JwtUtils } from "./jwt";
import { envVars } from "../../config/env";
import { Response } from "express";
import { CookieUtils } from "./cookies";


// * Creating access Token
const getAccessToken = (payload: JwtPayload) => {
    const accessToken = JwtUtils.createToken(payload,
        envVars.ACCESS_TOKEN_SECRET,
        { expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN } as SignOptions)
    return accessToken;
}

// * Creating refresh token
const getRefeshToken = (payload: JwtPayload) => {
    const refreshToken = JwtUtils.createToken(payload,
        envVars.REFRESH_TOKEN_SECRET,
        { expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN } as SignOptions)
    return refreshToken;
}

const setAccessTokenCookie = (res: Response, token: string) => {
    // * pnpm add ms
    CookieUtils.setCookie(res, 'accessToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge:60*60*60*24  // * chnage here

    })
}

const setRefreshTokenCookie = (res: Response, token: string) => {

    CookieUtils.setCookie(res, 'refreshToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        // * 7 days
        maxAge: 60*60*60*24*7, // * chnage here
    })
}


const SetBetterAuthSessionCookies = (res: Response, token:string) => {
  
    CookieUtils.setCookie(res, 'better-auth.session_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict', 
        path: '/',
        // * 1 day
        maxAge:60*60*60*24 // * chnage here
})}


export const TokenUtils = {
    getAccessToken,
    getRefeshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    SetBetterAuthSessionCookies
}   