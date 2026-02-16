import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../shared/SendResponse";
import status from "http-status";

const GetAllDoctor=catchAsync(
    async(req:Request,res:Response)=>{
        const result= await DoctorServices.getAllDoctor()
        sendResponse(res,{
            httpStatusCode:status.CREATED,
            success:true,
            message:"All doctor fetched successfully",
            data:result
        })
    }
)


export const DoctorController={
    GetAllDoctor
}