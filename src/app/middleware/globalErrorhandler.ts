/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import status from "http-status";
import z from "zod";
import {TErrorResponse, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // * For zod error handeling

    const errorSource: TErrorSources[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR; // * pnpm add http-status --> install is pacakage
    let message: string = "Internal Server Error"

    if (err instanceof z.ZodError) {

        const simplifiedError= handleZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        
        errorSource.push(...simplifiedError.errorSources)

    }

    const errorResponse :TErrorResponse={
        success:false,
        message:message,
        errorSources: errorSource,
        statusCode
        
    }

    res.status(statusCode).json(errorResponse)
}




