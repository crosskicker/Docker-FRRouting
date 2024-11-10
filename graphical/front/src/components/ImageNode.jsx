import { Handle, Position } from '@xyflow/react';
import { useEffect } from 'react';

function ImageNode({ data, id, selected }) {
  useEffect(() => {
    console.log("La valeur de 'selected' a changé :" + id + " : " + selected);
  }, [selected]);

  return (
    <div
      style={{ width: '48px', height: '48px', position: 'relative' }}
      className="w-12 h-12 inline-block mr-2"
    >
      {/* Conditionne le rendu des poignées en fonction de data.inConnection */}
      {data.toConnect && (
        <>
          <Handle type="target" position={Position.Top} id={`top${id}`} />
          <Handle type="target" position={Position.Left} id={`left${id}`} />
          <Handle type="source" position={Position.Bottom} id={`bottom${id}`} />
          <Handle type="source" position={Position.Right} id={`right${id}`} />
        </>
      )}
      <img src={data.image} alt="Device" style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default ImageNode;
