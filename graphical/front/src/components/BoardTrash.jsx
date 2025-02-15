import React, { useState, useEffect,useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';
import netDeviceL from '../data/devicesList';
import fetchElemToBoard from '../fetching/fetchElem';

import { ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

function BoardTrash() {

  /* TEMPORAIRE */
  const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  ];

  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  /* TEMPORAIRE */

  const [board, setBoard] = useState([]);

  const idCounter = useRef(1);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => addDeviceToBoard(item.id,monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  
  const addDeviceToBoard = async (id,monitor) => {
    const clientOffset = monitor.getClientOffset(); // Récupérer la position de la souris au moment du drop
    if (clientOffset) {
      const netDeviceLBis = netDeviceL.filter((picture) => id === picture.id);
      const id_n = idCounter.current++;
       const updatedDevice = {
        image: netDeviceLBis[0].image,
        position: {x : clientOffset.x, y : clientOffset.y } ,
        id : netDeviceLBis[0].id,
        id_n : id_n,
      };

      /* console.log(clientOffset.x+" et "+clientOffset.y) */
      console.log("id_n de Img : " + id_n)
      setBoard((board) => [...board, updatedDevice]);

      try {
        await fetchElemToBoard(updatedDevice,"/add-to-board");
        console.log("Élément ajouté et serveur notifié :", updatedDevice);
      } catch (error) {
        console.error("Erreur lors de l'envoi au serveur :", error);
      }

    }
    
  }
  

  return (
    <div ref={drop} className="w-5/6 h-7/8 flex">
      {board.map((picture) => {
          return <img  key={picture.id_n}  src={picture.image} 
             style={{
            position: 'absolute',
            left: picture.position.x ,
            top: picture.position.y ,
          }} 
          className="w-12 h-12 inline-block mr-2"
           />;
        })}
        <ReactFlow nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} />
    </div>
  );
}

export default BoardTrash;
