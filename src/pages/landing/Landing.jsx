import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProgressWorks from "../../components/ProgressWorks";

const Landing = () => {

  const {user} = useAuth()
   const navigate = useNavigate()

  const handleGet = ()=>{

    if(!user){
   navigate("/login")
    }
    else{
      navigate("/dashboard")
    }
  }




  return (
    <>
    <div className="land min-h-screen w-screen">
      <div className="h-[50vh] w-screen  flex flex-col justify-end  items-center">
        <h1 className="text-[20px] font-hero mb-4 from-neutral-800 text-center md:text-[35px] md:max-w-[35vw]">
          Assess your mental health with{" "}
          <span className="bg-[#ffffff6c] font-bold px-2">Evalwell</span> Care
          in just 2 minutes.
        </h1>
      </div>
      <div className="h-[50vh] w-screen flex flex-col items-center justify-evenly gap-8 overflow-hidden">
        
        <button className="bg-[#000] text-white 56789 px-2 py-2 rounded-full shadow-md shadow-[#000000] font-hero capitalize"
        onClick={handleGet}>
          Get started
        </button>
        <div className="flex-1  mt-7">
          <img src="/dash.png" className="opacity-80" alt="" />
        </div>
      </div>
    </div>
    <ProgressWorks/>
    </>
  );
};

export default Landing;
