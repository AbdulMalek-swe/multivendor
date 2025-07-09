import { privateRequest, publicRequest } from '@/lib/axios';
import React, { useEffect } from 'react';

const CreateAddress = () => {
    useEffect(()=>{ 
            privateRequest?.get("user/address").then((res)=>{
                console.log(res,"==========");
            }).catch((err)=>{
                console.log(err,"errror is comming");
            }) 
            privateRequest?.get("user/division").then((res)=>{
                console.log(res,"==========");
            }).catch((err)=>{
                console.log(err,"errror is comming");
            }) 
    },[])
    return (
        <div>
            wekcoimesdfsdfaf
        </div>
    );
};

export default CreateAddress;