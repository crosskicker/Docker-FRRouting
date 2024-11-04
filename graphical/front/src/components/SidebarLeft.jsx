// src/layouts/SidebarLeft.js
import React from 'react';
import Device from './Device'
import Connection from './Connection'

function SidebarLeft() {
  return (
    <div className=" w-1/6 h-7/8 bg-gray-800 text-white p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sidebar</h2>
      <div className="flex flex-col space-y-2">
        <Device name = "Network device"/>
        <Device name = "Network service"/>
        <Device name = "Network terminal"/>
        <Connection></Connection>
      </div>
    </div>
  );
};

export default SidebarLeft;
