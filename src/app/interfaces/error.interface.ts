export interface TErrorSources {
    path: string,
    message: string
}

export interface TErrorResponse {
    statusCode:number, // * add the status code also
    success: boolean,
    message: string,
    errorSources: TErrorSources[],
    error?: unknown,
    stack?:string
}



