import dotenv from 'dotenv'
import AppError from '../app/errorHelpers/AppErrro'
import status from 'http-status'
dotenv.config()

interface EnvConfig {
    PORT: string,
    DATABASE_URL: string,
    BETTER_AUTH_SECRET: string,
    BETTER_AUTH_URL: string
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables = [
        'PORT',
        'DATABASE_URL',
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL'
    ]
    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            // * throw new Error(`Enviroment variable ${variable} is required but not set .env file`)
            // ! Use of the customize AppError
            throw new AppError(status.INTERNAL_SERVER_ERROR,`Enviroment variable ${variable} is required but not set in the .env file`)
        }
    })
    
    return {
        PORT: process.env.PORT as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string
    }
}


export const envVars = loadEnvVariables()

