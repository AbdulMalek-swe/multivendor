import { publicRequest } from "@/lib/axios"
// register api call here 
export const signup = async(payload)=>{
    return publicRequest.post("auth/register",payload)
}
// login api call here 
export const login = async(payload)=>{
    return publicRequest.post("auth/login",payload)
}