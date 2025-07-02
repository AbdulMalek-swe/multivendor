const { publicRequest } = require("@/lib/axios"); 
export const product = async(params={})=>{
    return await publicRequest.get("user/product",{params});
}