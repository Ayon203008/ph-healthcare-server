import { UserStatus } from "../../../generated/prisma/enums";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

interface IRegisterPatientPayload {
    name: string,
    email: string,
    password: string
}
interface ILoginUserPayload {
    email: string,
    password: string
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
            // * role and needPasswordChange will go as default values
        }
    })
    if (!data.user) {
        throw new Error("Failed to register password")
    }
    const paitent = await prisma.$transaction(async (tx) => {
        const paitentTx = await tx.patient.create({
            data: {
                userId: data.user.id,
                name: payload.name,
                email: payload.email
                // * make the contact number optional to the paitent.prisma schema other wise you will get error
            }
        })
        return paitentTx
    })
    return {
        ...data,
        paitent
    }
}

const loginUser = async (paylaod: ILoginUserPayload) => {
    const { email, password } = paylaod
    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })
    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked")
    }
    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted")
    }
    return data
}

export const AuthService = {
    registerPatient,
    loginUser
}