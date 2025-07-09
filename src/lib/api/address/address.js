import { privateRequest  } from "@/lib/axios"

export const address = async( )=>{
    return privateRequest.get("user/address")
}