import { publicRequest } from "@/lib/axios"
// register api call here 
export const register = async(payload)=>{
    return publicRequest.post("auth/login",payload)
}
// login api call here 
export const login = async(payload)=>{
    return publicRequest.post("auth/login",payload)
}