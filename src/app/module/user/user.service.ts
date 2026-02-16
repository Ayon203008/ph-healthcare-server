import { Role, Specialty } from "../../../generated/prisma/client";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (paylod: ICreateDoctorPayload) => {

    // * 1st validation
    const specialties: Specialty[] = []
    for (const specialtyId of paylod.specialties) {
        const specialty = await prisma.specialty.findUnique({
            where: {
                id: specialtyId
            }
        })

        if (!specialty) {
            throw new Error(`Specialty with id ${specialtyId} not found`)
        }
        specialties.push(specialty)
    }

    // * 2nd validation
    const userExists = await prisma.user.findUnique({
        where: {
            email: paylod.doctor.email
        }
    })

    if (userExists) {
        throw new Error("User with this email already exits")
    }

    const userData = await auth.api.signUpEmail({
        body: {
            email: paylod.doctor.email,
            password: paylod.password,
            name: paylod.doctor.name,
            role: Role.DOCTOR,
            needPasswordChange: true
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({

                data: {
                    userId: userData.user.id,
                    ...paylod.doctor,
                }
            })

            const doctorSpecialtyData = specialties.map((specilaty) => {
                return {
                    doctorId: doctorData.id,
                    specialtyId: specilaty.id
                }
            })

            await tx.doctorSpecialty.createMany({
                data: doctorSpecialtyData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    designation: true,
                    currentWorkingPlace: true,
                    user: {
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            createdAt: true,
                            updatedAt: true,
                            isDeleted: true,
                            image: true
                        }
                    },
                    specialties: {
                        select: {
                            specialty: {
                                select: {
                                    title: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            })

            return doctor
        })

        return result

    } catch (error) {
        console.log("Transcition error", error)
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error
    }
}

export const UserServices = {
    createDoctor
}

