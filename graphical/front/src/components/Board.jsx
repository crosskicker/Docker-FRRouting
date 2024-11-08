import React, { useState, useEffect,useRef } from 'react';
import { useDrop } from 'react-dnd';
import routerLogo from '../assets/router_logo.png';
import netDeviceL from '../data/devicesList';
import fetchElemToBoard from '../fetching/fetchElem'

function Board() {

  const [board, setBoard] = useState([]);

  const idCounter = useRef(1);
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => addDeviceToBoard(item.id,monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  /* TODO 
  gerer l'identifiant des img qui doit etre unique
  générer une list de ce qu'on cré pour la fetch
  */
  const addDeviceToBoard = async (id,monitor) => {
    const clientOffset = monitor.getClientOffset(); // Récupérer la position de la souris au moment du drop
    if (clientOffset) {
      const netDeviceLBis = netDeviceL.filter((picture) => id === picture.id);
      const id_n = idCounter.current++;
       const updatedDevice = {
        image: netDeviceLBis[0].image,
        x: clientOffset.x ,
        y: clientOffset.y ,
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
            left: picture.x ,
            top: picture.y ,
          }} 
          className="w-12 h-12 inline-block mr-2"
           />;
        })}
    </div>
  );
}

export default Board;
