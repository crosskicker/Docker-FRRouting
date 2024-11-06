import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';

function DraggableComponent() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    /* item: { id: 5 }, */
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  

  return (
    <div>
    <img ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}  src={routerLogo} alt="PB Router FRR"  className="w-12 h-12 inline-block mr-2"  />
    </div>
  );
}

export default DraggableComponent;
