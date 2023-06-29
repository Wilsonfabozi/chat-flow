import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NodeSidebarProps } from './types';
import { useEffect, useState } from 'react';
import { useReactFlow } from 'reactflow';

const NodeSidebar = ({
  closeNodeSidebar,
  currentNode,
}: NodeSidebarProps) => {
  const [name, setName] = useState<string>('');
  const { setNodes } = useReactFlow();

  useEffect(() => {
    setName(currentNode?.data.label);
  }, [currentNode]);

  useEffect(() => {
    setNodes((nodes) => nodes.map((node) => {
      if (currentNode && node.id === currentNode.id) {
        node.data = {
          ...node.data,
          label: name,
        };
      }

      return node;
    }));
  }, [currentNode, name, setNodes]);

  const closeButton = () => {

    if (name !== '') {
      closeNodeSidebar();
    }
  };

  return (
    <div className='flex
      flex-col
      items-center
      justify-between
      p-4
      w-96
      h-full
      bg-slate-300'
    >
      <TextField
        className='w-full'
        required
        id='node-name-required'
        label='Node Name'
        value={name}
        onChange={(input) => setName(input.target.value)}
      />

      <Button
        variant='contained'
        className='w-full bg-slate-900'
        onClick={closeButton}
      >
        Close
      </Button>
    </div>
  );
};

export default NodeSidebar;
