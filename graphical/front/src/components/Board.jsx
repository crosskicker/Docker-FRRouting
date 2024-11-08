import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';
import netDeviceL from '../data/devicesList';
import fetchElemToBoard from '../fetching/fetchElem';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ImageNode from './ImageNode' ;
 


const nodeTypes = {
  imageNode: ImageNode,
};

function Board() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const idCounter = useRef(1);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => addDeviceToBoard(item.id, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addDeviceToBoard = async (id, monitor) => {
    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
      const netDeviceLBis = netDeviceL.filter((picture) => id === picture.id);
      const id_n = idCounter.current++;
      const newNode = {
        id: id_n.toString(),
        type: 'imageNode',
        position: { x: clientOffset.x, y: clientOffset.y },
        data: { image: netDeviceLBis[0].image },
        id_c: id,
      };

      setNodes((nds) => [...nds, newNode]);

      try {
        await fetchElemToBoard(newNode, "/add-to-board");
        console.log("Élément ajouté et serveur notifié :", newNode);
      } catch (error) {
        console.error("Erreur lors de l'envoi au serveur :", error);
      }
    }
  };

  return (
    <div ref={drop} className="w-5/6 h-7/8 flex">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes} // Spécifie les types de nœuds personnalisés
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Board;
