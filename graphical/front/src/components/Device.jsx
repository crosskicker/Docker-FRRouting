import React, { useState } from 'react';

function Device({ name }) {
  // État pour contrôler la visibilité de la liste déroulante
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [routerList, setRouterList] =  useState([]);
  const [nbRouter, setNbRouter] = useState(0);

  // Fonction pour basculer la visibilité de la liste déroulante
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const addRouter = () => {
    setNbRouter((prevNbRouter) => prevNbRouter + 1);
    setRouterList([...routerList, `router${nbRouter}` ]);
    console.log(routerList);
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

      {/* Liste déroulante conditionnelle */}
      {/* Créer un nouveau composant pour ce qui est invisible car cette partie
      est différentes pour les autres */}
      {isDropdownVisible && (
        <div className="flex top-full mt-2 w-40 bg-gray-800 text-white p-2 rounded shadow-lg">
          <ul className="flex flex-col space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={addRouter}>Router FRR</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Device;
