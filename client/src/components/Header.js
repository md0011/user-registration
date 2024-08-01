import React from "react";
import { Link } from "react-router-dom";
import userImage from '../images/user.png';

function Header() {
  return (
    <div>
      <header className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img src={userImage} alt="user-img" className="h-11"/>
            <span className="ml-3 text-xl">User Registration</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/register" className="mx-20 hover:text-white">Registration Form</Link>
            <Link to="/admin" className="mx-20 hover:text-white">Admin Dashboard</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
