import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.services";
import { sendResponse } from "../../shared/SendResponse";
import status from "http-status";
import { TokenUtils } from "../../utils/token";


const registerPatient = catchAsync(
    async (req: Request, res: Response) => {
        const paylaod = req.body
        const result = await AuthService.registerPatient(paylaod)

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Paitent Registered successfully",
            data: result
        })
    }
)



const LoginUser = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body
        const result = await AuthService.loginUser(payload)

        const { accessToken, refreshToken, token, ...rest } = result

        TokenUtils.setAccessTokenCookie(res, accessToken)
        TokenUtils.setRefreshTokenCookie(res, refreshToken)
        TokenUtils.SetBetterAuthSessionCookies(res, token)

        sendResponse(res, {
            httpStatusCode: status.OK, // * Change the status also
            success: true,
            message: "User logged in successfully",
            data: {
                token,
                ...rest,
                accessToken
            }
        })
    }
)


export const AuthController = {
    registerPatient,
    LoginUser
}