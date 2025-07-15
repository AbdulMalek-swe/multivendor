import { privateRequest } from "@/lib/axios";

export const order = async(params={})=>{
    return await privateRequest.get(`/user/order`,{params});
}
