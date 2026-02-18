import { NextFunction, Request, Response } from "express";
import { CookieUtils } from "../utils/cookies";
import { prisma } from "../lib/prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import AppError from "../errorHelpers/AppErrro";
import status from "http-status";
import { JwtUtils } from "../utils/jwt";
import { envVars } from "../../config/env";

 export const  checkAuth =(...authRoles:Role[])=>async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const sessionToken = CookieUtils.getCookie(req, 'better-auth.session_token')

        if(!sessionToken){
            throw new Error("Unauthorized") 
        }

        if(sessionToken){
            const sessionExits= await prisma.session.findFirst({
                where:{
                    token:sessionToken,
                    expiresAt:{
                        gt: new Date()
                    }
                },
                include:{
                    user:true
                }
            })

            if(sessionExits && sessionExits.user){
                const user= sessionExits.user

                const now=new Date()
                const expiresAt=new Date(sessionExits.expiresAt)
                const createdAt=new Date(sessionExits.createdAt)

                const sessionLifeTime= expiresAt.getTime() - createdAt.getTime()
                const timeRemaining= expiresAt.getTime() - now.getTime()
                const percentageRemaining= (timeRemaining/sessionLifeTime)*100

                if(percentageRemaining<20){
                    res.setHeader('x-Session-Refresh', 'true')
                    res.setHeader('x-Session-Expires-At', expiresAt.toISOString())
                    res.setHeader('x-Time_Remaining',timeRemaining.toString()) 
                }

                if(user.status===UserStatus.BLOCKED || user.status===UserStatus.DELETED){
                    throw new AppError(status.UNAUTHORIZED,"Unauthorized")
                }

                if(user.isDeleted){
                    throw new AppError(status.UNAUTHORIZED,"Unauthorized")
                }

                if(authRoles.length>0 && !authRoles.includes(user.role as Role)){
                    throw new AppError(status.FORBIDDEN,"Forbidden")
                }

                const accessToken = CookieUtils.getCookie(req, 'accessToken')
                
                if(!accessToken){
                    throw new AppError(status.UNAUTHORIZED,"Unauthorized")
                 }
                
            }
        }

         const accessToken = CookieUtils.getCookie(req, 'accessToken')
        if (!accessToken) {
            throw new AppError(status.UNAUTHORIZED, "Unauthorized")
        }

        const verfiedToken = JwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET)

        if (!verfiedToken.success) {
            throw new AppError(status.UNAUTHORIZED, "Unauthorized")
        }

        if (verfiedToken.data.role !== "ADMIN") {
            throw new AppError(status.FORBIDDEN, "Forbidden")
        }
        next()


    }catch(error){
        next(error)
    }

 }