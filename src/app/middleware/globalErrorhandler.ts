/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../../config/env"
import status from "http-status";

export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    
    const statusCode : number =status.INTERNAL_SERVER_ERROR; // * pnpm add http-status --> install is pacakage
    const message:string='Internal Server Error'
    
    res.status(500).json({
        success:false,
        message:"Internal server error",
        error:err.message
    })
}

