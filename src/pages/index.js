import Button from "@/components/ui/Button";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      console.log(res);
      setIsSuccess(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsSuccess(false); // reset after 2s
      }, 800);
    }
  };
  return (
    <div className="flex justify-center h-screen items-center gap-4 font-">
      <Link href={"/service"}>service</Link>
      <Button
        onClick={() => handleClick()}
        // isLoading={isLoading}
        // isSuccess={isSuccess}
        className="!h-32"
      >
        {" "}
        Log in{" "}
      </Button>
    </div>
  );
}
