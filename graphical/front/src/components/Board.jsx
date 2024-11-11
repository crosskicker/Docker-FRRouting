import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import netDeviceL from '../data/devicesList';
import fetchElemToBoard from '../fetching/fetchElem';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ImageNode from './ImageNode';

const nodeTypes = {
  imageNode: ImageNode,
};

function Board({ inConnection }) {
  const [selectedNodes, setSelectedNodes] = useState([]); // Pour stocker les nœuds cliqués

  const onNodeClick = useCallback(
  (event, node) => {
    if (inConnection) {
      setSelectedNodes((prevNodes) => {
        if (prevNodes.length === 1) {
          // Deuxième nœud cliqué
          console.log("Deux noeuds ont été cliqués :", prevNodes[0], node);
          addConnection(prevNodes[0].id,node.id);
          // Appelle ici la fonction qui fait `console.log` ou une autre action
          return []; // Réinitialise après deux clics
        } else {
          return [node]; // Stocke le premier nœud cliqué
        }
      });
    }
  },
  [inConnection]
  );
/*   TODO
  gerer les erreurs
  custom les edges */
  const addConnection = (id1, id2) => {
    const newEdge = { id: `${id1}-${id2}`, source: id1, target: id2 };
    setEdges((eds) => [...eds, newEdge]);
  };
  

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const idCounter = useRef(1);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => addDeviceToBoard(item.id, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

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
        data: { image: netDeviceLBis[0].image/* , toConnect : inConnection  */},
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
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
      >
        <Background />
        <MiniMap />
      </ReactFlow>
      {inConnection && <p>on est en mode connect</p>}
    </div>
  );
}

export default Board;
