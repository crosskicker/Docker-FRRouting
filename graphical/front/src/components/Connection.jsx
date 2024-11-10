import React from 'react';
import  { useState} from 'react';

function Connection({setInConnection}) {
  const [temp,setTemp] = useState(true);
  const handleConnection = () => {
    setInConnection(temp); // Passe isSelected à true quand l'élément est cliqué
    setTemp(!temp);
  };
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
          To connect
        </div>
  
        {isDropdownVisible && (
          <div className="flex top-full mt-2 w-36 bg-gray-800 text-white p-2 rounded shadow-lg hover:bg-gray-700 rounded cursor-pointer">
            <img onClick={handleConnection} src="TODO" alt="Connection"/>
          </div>
        )}
      </div>
    );
};

export default Connection;