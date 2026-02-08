/* eslint-disable @typescript-eslint/no-explicit-any */

import { SpecilatyService } from "./specilaty.service";
import { catchAsync } from "../../shared/catchAsync";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/SendResponse";

const createSpecilaty = catchAsync(
    async (req: Request, res: Response) => {
        const paylod = req.body
        const result = await SpecilatyService.createSpecilaty(paylod)
        // * Use of sendResponse function
        sendResponse(res,{
            httpStatusCode:201,
            success:true,
            message:"Specilaty created Successfully",
            data:result
        })
    }
)
const getAllSpecilaty = catchAsync(
    async (req: Request, res: Response) => {
        const result = await SpecilatyService.getAllSpecilaty()
         sendResponse(res,{
            httpStatusCode:200,
            success:true,
            message:"Specilaty get Successfully",
            data:result
        })
    }
)

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params
        const result = await SpecilatyService.deleteSpecialty(id as string)
        sendResponse(res,{
            httpStatusCode:200,
            success:true,
            message:"Specilaty deleted Successfully",
            data:result
        })
    }
)

export const SpecilatyController = {
    createSpecilaty,
    getAllSpecilaty,
    deleteSpecialty
}