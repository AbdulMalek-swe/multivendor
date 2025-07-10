import { privateRequest } from "@/lib/axios";

export const order = async()=>{
    return await privateRequest.get(`/user/order`);
}
