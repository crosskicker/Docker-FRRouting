import React, { useState } from 'react';
import DraggableComponent from './DraggableComponent';
import netDeviceL from '../data/devicesList';

function Device({ name }) {
  // État pour contrôler la visibilité de la liste déroulante
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [routerList, setRouterList] =  useState([]);
  const [nbRouter, setNbRouter] = useState(0);

  // Fonction pour basculer la visibilité de la liste déroulante
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };


  return (
    <div className="relative">
      {/* Élément cliquable */}
      <div
        className="hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        {name}
      </div>

      {isDropdownVisible && (
        <div className="flex top-full mt-2 w-40 bg-gray-800 text-white p-2 rounded shadow-lg">
          <ul className="flex flex-col space-y-2">
              {netDeviceL.map((device) => (
                <li  key={device.id} className="hover:bg-gray-700 p-2 rounded cursor-pointer flex flex-col">
                  <DraggableComponent srcImg={device.image} idImg={device.id}/>
                  <p>Router FRR</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Device;
