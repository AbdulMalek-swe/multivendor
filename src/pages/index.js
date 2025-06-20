import SingleCart from "@/components/product/SingleCart";
import Button from "@/components/ui/Button";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const handleClick = async () => {
  //   setIsLoading(true);
  //   setIsSuccess(false);
  //   try {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //     console.log(res);
  //     setIsSuccess(true);
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false);
  //     setTimeout(() => {
  //       setIsSuccess(false); // reset after 2s
  //     }, 800);
  //   }
  // };
  const productDetails =[
    {
      id:1,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:300,
      price:350,
      image:"/products/1.png"
    },
    {
       id:2,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:250,
      price:350,
      image:"/products/2.png"
    },
    {
       id:3,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:160,
      price:200,
      image:"/products/3.png"
    },
    {
       id:4,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:300,
      price:550,
      image:"/products/4.png"
    },
    {
       id:5,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:150, 
      price:230,
      image:"/products/5.png"
    },
    {
       id:6,
      title:"Awei AT7",
      subtitle:"Mayer Dua Electronics",
      group:"laden",
      discount_price:150, 
      price:230,
      image:"/products/5.png"
    },
  ]
  return (
    <div className=" flex gap-4 flex-wrap  ">
      {
        productDetails?.map((product,idx)=><SingleCart product={product}/>)
      }
      
     
      {/* <Link href={"/service"}>service</Link>
      <Button
        onClick={() => handleClick()}
        // isLoading={isLoading}
        // isSuccess={isSuccess}
        className="!h-32"
      >
        {" "}
        Log in{" "}
      </Button> */}
    </div>
  );
}
