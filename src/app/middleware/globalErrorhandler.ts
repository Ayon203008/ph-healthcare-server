/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../../config/env"
import status from "http-status";
import z from "zod";

interface TErrorSource {
    path: string,
    message: string
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    // * For zod error handeling

    const errorSource: TErrorSource[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR; // * pnpm add http-status --> install is pacakage
    let message: string = "Internal Server Error"

    if (err instanceof z.ZodError) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = "zod valodation error";

        err.issues.forEach(issue => {
            errorSource.push({
                path: issue.path.join(" "),
                message: issue.message
            })
        })
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
        errorSource
    })
}



