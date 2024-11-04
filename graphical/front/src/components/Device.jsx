import React, { useState } from 'react';

function Device({ name }) {
  // État pour contrôler la visibilité de la liste déroulante
  const [isDropdownVisible, setDropdownVisible] = useState(false);

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

      {/* Liste déroulante conditionnelle */}
      {isDropdownVisible && (
        <div className="absolute top-full mt-2 w-40 bg-gray-800 text-white p-2 rounded shadow-lg">
          <ul className="flex flex-col space-y-2">
            <li className="hover:bg-gray-700 p-2 rounded">Option 1</li>
            <li className="hover:bg-gray-700 p-2 rounded">Option 2</li>
            <li className="hover:bg-gray-700 p-2 rounded">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Device;
