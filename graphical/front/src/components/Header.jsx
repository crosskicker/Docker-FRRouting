import React from 'react';


function Header() {
  return (
    <div className="flex w-screen bg-gray-800 text-white p-4 space-x-8">
      <div className="hover:bg-gray-700 p-2"> file </div>
      <div className="hover:bg-gray-700 p-2"> edit </div>
      <div className="hover:bg-gray-700 p-2"> preference </div>
      <div className="hover:bg-gray-700 p-2"> config </div>
    </div>
  );
};

export default Header;