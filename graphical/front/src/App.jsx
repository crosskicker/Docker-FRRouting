// src/App.js
import React from 'react';
import SidebarLeft from './components/SidebarLeft';
import Header from './components/Header';
import Board from './components/Board';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header/>
      <div className="flex w-full h-full">
      <DndProvider backend={HTML5Backend}>
        {/* capter la presence de la souris e la passer aux enfants */}
        <SidebarLeft />
        <Board/>
      </DndProvider>
    </div>
    </div>
  );
}

export default App;
