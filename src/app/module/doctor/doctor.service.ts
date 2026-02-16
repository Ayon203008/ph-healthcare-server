import { prisma } from "../../lib/prisma"

const getAllDoctor = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        }
    })
    return doctors
}

// * get doctor by id

// * update doctor

// * delete doctor

export const DoctorServices = {
    getAllDoctor
}

