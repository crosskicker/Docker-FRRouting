// src/App.js
import React from 'react';
import SidebarLeft from './components/SidebarLeft';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header/>
      <div className="flex w-full h-full">
        <SidebarLeft />
        <div className="w-5/6 h-7/8">L</div> 
    </div>
    </div>
  );
}

export default App;
