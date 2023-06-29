import { Handle, NodeProps, Position } from 'reactflow';
import SendIcon from '@mui/icons-material/Send';

const CustomNode = ({ data }: NodeProps) => (
  <div className='flex
    flex-col
    items-center
    justify-center
    w-24
    h-24
    bg-blue-400
    text-white
    rounded-2xl'
  >
    <Handle
      type='target'
      position={Position.Left}
      isConnectable={false}
      draggable={false}
    />

    <div>node {data.label}</div>
    <div className='flex
        flex-col
        items-center
        justify-center
        h-16'
    >
      <SendIcon />
    </div>

    <Handle
      type='source'
      position={Position.Bottom}
      isConnectable={false}
      draggable={false}
    />
  </div>
);

CustomNode.displayName = 'CustomNode';

export default CustomNode;
