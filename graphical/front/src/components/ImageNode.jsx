import { Handle } from '@xyflow/react';

const ImageNode = ({ data }) => {
  return (
    <div style={{ width: '48px', height: '48px', overflow: 'hidden', position: 'relative' }}>
      <img src={data.image} alt="Device" style={{ width: '100%', height: '100%' }} />
      {/* Ajoute une handle pour l'entrée en haut */}
      <Handle type="target" position="top" style={{ background: '#555' }} />
      {/* Ajoute une handle pour la sortie en bas */}
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
};

export default ImageNode;