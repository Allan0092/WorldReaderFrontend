import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">WorldReader</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4" to="/">Home</Link>
            <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4" to="/about">About</Link>
            <Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200" to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default NavBar;
