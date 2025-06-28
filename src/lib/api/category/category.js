const { publicRequest } = require("@/lib/axios");

export const category = async()=>{
    return await publicRequest.get("user/category");
}