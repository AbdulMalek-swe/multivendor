const { publicRequest } = require("@/lib/axios");

export const shop = async(params={})=>{
    return await publicRequest.get("user/vendor",{params});
}