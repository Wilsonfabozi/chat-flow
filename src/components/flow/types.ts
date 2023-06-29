import { Dispatch, SetStateAction } from 'react';
import { Edge, EdgeTypes, Node, NodeTypes } from 'reactflow';
import StartNode from './customNodes/startNode';
import NewNode from './customNodes/newNode';
import CustomNode from './customNodes/customNode';
import CollapseEdge from './customEdges/collapseEdge';
import DefaultEdge from './customEdges/defaultEdge';

export type FlowProps = {
  nodesProp?: Node[],
  edgesProp?: Edge[]
}

export const nodeTypes: NodeTypes = {
  start: StartNode,
  new: NewNode,
  custom: CustomNode,
};

export const edgeTypes: EdgeTypes = {
  collapse: CollapseEdge,
  default: DefaultEdge,
};

export type FlowContextType = {
  nodes: Node[],
  setNodes: Dispatch<SetStateAction<Node[]>>,
  edges: Edge[],
  setEdges: Dispatch<SetStateAction<Edge[]>>,
}

export type NodeSidebarProps = {
  closeNodeSidebar: () => void,
  currentNode: Node | undefined
}
