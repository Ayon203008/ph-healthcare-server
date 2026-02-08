import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
// * For create Specilaty
const createSpecilaty =async(payload:Specialty):Promise<Specialty>=>{
    const specialty = await prisma.specialty.create({
        data:payload
    })
    return specialty
}

// * For get all specialty
const getAllSpecilaty=async()=>{
    const result = await prisma.specialty.findMany()
    return result
}

// * For delete specialty
const deleteSpecialty=async(id:string):Promise<Specialty>=>{
    const result = await prisma.specialty.delete({
        where:{id}
    })
    return result
}

export const SpecilatyService ={
    createSpecilaty,
    getAllSpecilaty,
    deleteSpecialty
}


