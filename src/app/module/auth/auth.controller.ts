import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { AuthService } from "./auth.services";
import { sendResponse } from "../../shared/SendResponse";
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
export const AuthController = {
    registerPatient
}