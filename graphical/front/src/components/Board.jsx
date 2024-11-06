import React from 'react';
import { useDrag } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';
import { useState } from 'react';
import { useDrop } from "react-dnd";



function Board() {
    const elemList = [
        {
          id: 1,
          loc:null
            },
        {
          id: 2,
          loc:null
        },
        {
          id: 3,
          loc:null
        },
      ];
    /*  temporaire */
    const [isDrop, setDrop] = useState(false);


    const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "ITEM",
      drop: () => addElemToBoard(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    const addElemToBoard = () => {
        setDrop(true);
        console.log("on vient de drop un element")
      };

  return (
    <div ref={drop} className="w-5/6 h-7/8">
        {isDrop && (
    <img src={routerLogo} alt="PB Router FRR" className="w-12 h-12 inline-block mr-2" />
  )}
    </div>
  );
}

export default Board;
