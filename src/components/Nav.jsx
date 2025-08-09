import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  

  return (
    <div className="absolute h-[50px] w-screen top-3 rounded-full gap-4 flex justify-between md:justify-around px-3  items-center">
      <Link
        to="/"
        className="capitalize text-[23px] font-logo text-center bg-clip-text text-transparent  bg-neutral-800"
      >
       <img src="/logo.png" className="h-[60px]" alt="" />
      </Link>

      {user ? (
       <div className="flex items-center gap-2 md:gap-5">
        
      <p className="text-[10px] text-neutral-700"> <UserCircleIcon className=""/>{user.data.role} </p>
      <p className="capitalize font-bold">{user.data.name}</p>
       <button 
          onClick={handleLogout}
          className="px-3 py-2 backdrop-blur-lg bg-gradient-to-r from-[#efc2ff] to-[#ffffff] shadow-sm shadow-[#000] rounded-lg font-hero"
        >
          Logout
        </button>  </div>
      ) : (
        <Link to="/login">
          <button className="px-3 py-2 shadow-sm shadow-[#000000] backdrop-blur-lg bg-gradient-to-r from-[#efc2ff] to-[#ffffff] rounded-lg font-hero">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Nav;