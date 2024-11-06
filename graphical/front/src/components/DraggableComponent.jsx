import React from 'react';
import { useDrag } from 'react-dnd';
/* import routerLogo from '../assets/router_logo.png';
 */

function DraggableComponent({srcImg,idImg}) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'ITEM',
    item: { id : idImg },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <img
        src={srcImg}
        alt="PB Router FRR"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
        className="w-12 h-12 inline-block mr-2"
      />
    </div>
  );
}

export default DraggableComponent;
