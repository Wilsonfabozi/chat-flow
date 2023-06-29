import { NodeProps, Handle, Position } from 'reactflow';
import Tooltip from '@mui/material/Tooltip';

const StartNode = ({ data }: NodeProps) => (
  <div className='flex
    items-center
    justify-center
    w-12
    h-12
    text-base
    bg-blue-900
    text-white
    font-bold
    rounded-full'
  >
    <Tooltip title='Welcome' placement='top' arrow>
      <div>{data.label}</div>
    </Tooltip>
    <Handle
      type='source'
      position={Position.Bottom}
      isConnectable={false}
      draggable={false}
    />
  </div>
);

StartNode.displayName = 'StartNode';

export default StartNode;
