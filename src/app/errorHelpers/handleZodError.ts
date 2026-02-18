import status from "http-status";
import z from "zod";
import { TErrorSources } from "../interfaces/error.interface";

export const handleZodError = (err: z.ZodError) => {
    const statusCode = status.BAD_REQUEST;
    const message = "zod validation error";

    const errorSources: TErrorSources[] = [];

    err.issues.forEach(issue => {
        errorSources.push({
            path: issue.path.join(" "),
            message: issue.message
        })
    })

    return {
        success: false,
        message,
        statusCode,
        errorSources
    }
}