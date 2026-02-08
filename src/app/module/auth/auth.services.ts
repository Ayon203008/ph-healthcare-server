import { auth } from "../../lib/auth";

interface IRegisterPatientPayload{
    name:string,
    email:string,
    password:string
}
const registerPatient = async(payload:IRegisterPatientPayload)=>{
    const {name,email,password}=payload

    const data = await auth.api.signUpEmail({
        body:{
            name,
            email,
            password
            // * role and needPasswordChange will go as default values
        }
    })
    if(!data.user){
        throw new Error("Failed to register password")
    }
    return data
}

export const AuthService={
 registerPatient
}