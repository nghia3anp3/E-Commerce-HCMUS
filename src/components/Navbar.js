import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <span className="text-white font-semibold text-lg">Logo</span>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">About</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Services</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:hidden mt-4">
          <form className="flex flex-col">
            <input type="text" placeholder="Search..." className="px-4 py-2 rounded-lg border-gray-600 border focus:outline-none focus:border-gray-700 mb-2" />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
