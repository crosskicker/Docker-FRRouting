import { Handle } from '@xyflow/react';
/* TODO 
corriger la position dans le composant parent
corriger les handles et personnaliser les edges
*/
const ImageNode = ({ data }) => {
  return (
    <div style={{ width: '48px', height: '48px' ,
         position: 'relative' }} 
         className="w-12 h-12 inline-block mr-2"
    >
      <img src={data.image} alt="Device" style={{ width: '100%', height: '100%' }} />
      {/* Ajoute une handle pour l'entrée en haut */}
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <Handle type="source" position="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
      <Handle type="target" position="bottom" style={{ background: '#555' }} />
      <Handle type="source" position="left" style={{ background: '#555' }} />
      <Handle type="target" position="right" style={{ background: '#555' }} />
      <Handle type="source" position="right" style={{ background: '#555' }} />

    </div>
  );
};

export default ImageNode;