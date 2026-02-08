import { Response } from "express"

// * Declaring interface of Send Response data

interface IResponseData<T> {
    httpStatusCode: number,
    success: boolean,
    message: string,
    data?: T
}

// * make the function of sendResponse data 

export const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
    const { success, message, data, httpStatusCode } = responseData
    res.status(httpStatusCode).json({
        success,
        message,
        data
    })
}