import { useState } from 'react';
import {
  Node,
  Edge,
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useReactFlow,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const hideNode = (nodesToHide: string[], hideMode: boolean) => (node: Node) => {
  if (nodesToHide.includes(node.id) && nodesToHide) {
    node.hidden = hideMode;
  }

  return node;
};

const hideEdge = (edgesToHide: string[], hideMode: boolean) => (edge: Edge) => {
  if (edgesToHide.includes(edge.id)) {
    edge.hidden = hideMode;
  }

  return edge;
};

const checkTarget = (edge: Edge[], id: string) => {
  const edges = edge.filter((ed) => ed.target !== id);

  return edges;
};

const CollapseEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();
  const [hidden, setHidden] = useState(false);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const hiddenClassName = 'collapsedButton';

  const collapseOnClick = () => {
    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();
    const nodesToHide: string[] = [];
    const edgesToHide: string[] = [];

    const stack: Node[] = [];

    let hideMode = true;

    let currentNodeId = '';

    if (id.includes('-')) {
      currentNodeId = edges.find((item) => item.id === id)?.target as string;
      nodesToHide.push(currentNodeId);
    } else {
      currentNodeId = id;
    }

    const currentNode = nodes.find((item) => item.id === currentNodeId) as Node;

    stack.push(currentNode);

    hideMode = !currentNode.hidden;

    while (stack.length > 0) {
      const lastNode = stack.pop();

      if (lastNode) {
        const childNodes = getOutgoers(lastNode, nodes, edges);
        const childEdges = checkTarget(getConnectedEdges([lastNode], edges), currentNodeId);

        childNodes.forEach((node) => {
          stack.push(node);
          nodesToHide.push(node.id);
        });

        childEdges.forEach((edge: Edge) => edgesToHide.push(edge.id));
      }
    }

    setNodes((node) => node.map(hideNode(nodesToHide, hideMode)));
    setEdges((edge) => edge.map(hideEdge(edgesToHide, hideMode)));

    setHidden(hideMode);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div className='nodrag nopan absolute text-xs'
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <button
            className={`flex
              items-center
              justify-center
              w-5 h-5
              text-base
              cursor-pointer
              font-bold
              rounded-full
              bg-slate-300
              text-gray-600 
              collapsableButton 
              ${hidden ? hiddenClassName : ''}`}
            onClick={collapseOnClick}
          >
            <ArrowDropDownIcon />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CollapseEdge;
