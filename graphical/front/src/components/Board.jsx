import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';

function Board() {
  const [isDrop, setDrop] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset(); // Récupérer la position de la souris au moment du drop
      if (clientOffset) {
        setImagePosition({ x: clientOffset.x, y: clientOffset.y });
        setDrop(true);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="w-5/6 h-7/8 relative">
      {isDrop && (
        <img
          src={routerLogo}
          style={{
            position: 'absolute',
            left: imagePosition.x,
            top: imagePosition.y,
          }}
          alt="PB Router FRR"
          className="w-12 h-12 inline-block mr-2"
        />
      )}
    </div>
  );
}

export default Board;
