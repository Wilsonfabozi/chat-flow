import {
  BaseEdge,
  EdgeProps,
  getSmoothStepPath,
} from 'reactflow';

const DefaultEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (<BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />);
};

export default DefaultEdge;
