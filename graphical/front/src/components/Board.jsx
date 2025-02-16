import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import netDeviceL from '../data/devicesList';
import { fetchElemToBoard, fetchConnection } from '../fetching/fetchElem';


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

  /*
  Detection de deux noeuds cliqué
  apres etre passé en mode connection
  on crée une connection avec React Flow 
  via addConnection
  */
  const onNodeClick = useCallback(
  (event, node) => {
    if (inConnection) {
      setSelectedNodes((prevNodes) => {
        if (prevNodes.length === 1) {
          // Deuxième nœud cliqué
          console.log("Deux noeuds ont été cliqués :", prevNodes[0], node);
          addConnection(prevNodes[0].id,node.id);
          return []; // Réinitialise après deux clics
        } else {
          return [node]; // Stocke le premier nœud cliqué
        }
      });
    }
  },
  [inConnection]
  );



  /*   
  Ajout de la connection entre les noeuds
  */
  const addConnection = async (id1, id2) => {
    setEdges(async (eds) => {
      // Vérifier si la connexion existe déjà
      const alreadyExists = eds.some(
        (edge) => 
          (edge.source === id1 && edge.target === id2) || 
          (edge.source === id2 && edge.target === id1) 
      );
  
      if (alreadyExists) {
        console.warn(`Connexion entre ${id1} et ${id2} déjà existante.`);
        return eds; 
      }
      /* try {
        await fetchConnection({ test: "test" }, "/add-connection");
        console.log("Élément ajouté et serveur notifié :");
      } catch (error) {
        console.error("Erreur lors de l'envoi au serveur :", error);
      } */
      console.log(`Ajout d'une connexion entre ${id1} et ${id2}`);
      return [...eds, { id: `${id1}-${id2}`, source: id1, target: id2 }];
    });
  };
  
  

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const idCounter = useRef(1);

    /* Debug des edges */
    useEffect(() => {
      console.log("Connexions actuelles :", edges);
    }, [edges]);


  /* Ajout de l'élément dans le board via le mécanisme
      de Drag and Drop (librairie dnd)
      Permet d'ajouter en tant que Node pour la partie React Flow via addDeviceToBoard 
  */ 
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

  const onConnect = useCallback(() => {
    console.log("Connexion via Handles désactivée !");
  }, []);
  
  /*   
  Suppression d'une connexion
  */
 const onEdgeClick = useCallback(
    (event, edge) => {
      if (inConnection) {
        console.log("Suppression de la connexion :", edge);
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
    },
    [inConnection]
  );
  
  

  /* Ajout l'élément Noeud qui vient d'etre drop 
      dans la liste des noeud de React Flow */
  const addDeviceToBoard = async (id, monitor) => {
    const clientOffset = monitor.getClientOffset();
    if (clientOffset) {
/*       TODO
à changer quand on aurait autre que des netdevice (netDeviceL)
 */      const netDeviceLBis = netDeviceL.filter((picture) => id === picture.id);
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
    <div className={`w-5/6 h-7/8 flex ${inConnection ? 'in-connection' : ''}`} ref={drop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
      >
        <Background />
        <MiniMap />
      </ReactFlow>
      {inConnection && <p>🖱 Mode Connexion activé</p>}
    </div>
  );
  
}

export default Board;
