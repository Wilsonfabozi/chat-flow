'use client';

import {
  useCallback,
  useState,
  MouseEvent,
  // useRef,
  // MutableRefObject,
} from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowInstance,
  applyEdgeChanges,
  applyNodeChanges,
  // getOutgoers,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './styles.css';
import { edgeTypes, nodeTypes } from './types';
import Drawer from '@mui/material/Drawer';
import NodeSidebar from './nodeSidebar';

const initialNodes: Node[] = [
  {
    'width': 96,
    'height': 96,
    'id': '12',
    'position': {
      'x': 200,
      'y': 1200,
    },
    'type': 'custom',
    'data': {
      'label': '2',
    },
    'parentNode': '0',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 200,
      'y': 1200,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '13',
    'position': {
      'x': 100,
      'y': 110,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '12',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 300,
      'y': 1310,
    },
  },
  {
    'width': 96,
    'height': 96,
    'id': '10',
    'position': {
      'x': 200,
      'y': 800,
    },
    'type': 'custom',
    'data': {
      'label': '1.2',
    },
    'parentNode': '2',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 400,
      'y': 1000,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '11',
    'position': {
      'x': 100,
      'y': 110,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '10',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 500,
      'y': 1110,
    },
  },
  {
    'width': 96,
    'height': 96,
    'id': '8',
    'position': {
      'x': 200,
      'y': 200,
    },
    'type': 'custom',
    'data': {
      'label': '2.1',
    },
    'parentNode': '6',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 800,
      'y': 800,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '9',
    'position': {
      'x': 100,
      'y': 110,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '8',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 900,
      'y': 910,
    },
  },
  {
    'width': 96,
    'height': 96,
    'id': '6',
    'position': {
      'x': 200,
      'y': 200,
    },
    'type': 'custom',
    'data': {
      'label': '1.1.1',
    },
    'parentNode': '4',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 600,
      'y': 600,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '7',
    'position': {
      'x': 100,
      'y': 310,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '6',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 700,
      'y': 910,
    },
  },
  {
    'width': 96,
    'height': 96,
    'id': '4',
    'position': {
      'x': 200,
      'y': 200,
    },
    'type': 'custom',
    'data': {
      'label': '1.1',
    },
    'parentNode': '2',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 400,
      'y': 400,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '5',
    'position': {
      'x': 100,
      'y': 310,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '4',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 500,
      'y': 710,
    },
  },
  {
    'width': 96,
    'height': 96,
    'id': '2',
    'position': {
      'x': 200,
      'y': 200,
    },
    'type': 'custom',
    'data': {
      'label': '1',
    },
    'parentNode': '0',
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'dragging': false,
    'positionAbsolute': {
      'x': 200,
      'y': 200,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '3',
    'position': {
      'x': 100,
      'y': 910,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '2',
    'draggable': false,
    'selectable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 300,
      'y': 1110,
    },
  },
  {
    'width': 48,
    'height': 48,
    'id': '0',
    'position': {
      'x': 0,
      'y': 0,
    },
    'type': 'start',
    'data': {
      'label': 'Start',
    },
    'draggable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 0,
      'y': 0,
    },
  },
  {
    'width': 32,
    'height': 32,
    'id': '1',
    'position': {
      'x': 100,
      'y': 1310,
    },
    'type': 'new',
    'data': {
      'label': '+',
    },
    'parentNode': '0',
    'draggable': false,
    'connectable': false,
    'hidden': false,
    'positionAbsolute': {
      'x': 100,
      'y': 1310,
    },
    'selected': true,
  },
];

const initialEdges: Edge[] = [
  {
    'id': '0-12',
    'source': '0',
    'target': '12',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '12-13',
    'source': '12',
    'target': '13',
    'hidden': false,
  },
  {
    'id': '2-10',
    'source': '2',
    'target': '10',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '10-11',
    'source': '10',
    'target': '11',
    'hidden': false,
  },
  {
    'id': '6-8',
    'source': '6',
    'target': '8',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '8-9',
    'source': '8',
    'target': '9',
    'hidden': false,
  },
  {
    'id': '4-6',
    'source': '4',
    'target': '6',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '6-7',
    'source': '6',
    'target': '7',
    'hidden': false,
  },
  {
    'id': '2-4',
    'source': '2',
    'target': '4',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '4-5',
    'source': '4',
    'target': '5',
    'hidden': false,
  },
  {
    'id': '0-2',
    'source': '0',
    'target': '2',
    'type': 'collapse',
    'hidden': false,
  },
  {
    'id': '2-3',
    'source': '2',
    'target': '3',
    'hidden': false,
  },
  {
    'id': '0-1',
    'source': '0',
    'target': '1',
    'type': 'default',
    'interactionWidth': 0,
    'hidden': false,
  },
];

const Flow = () => {
  const [_instance, setInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [open, setOpen] = useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<Node>();

  // const dragRef: MutableRefObject<Node | null> = useRef(null);

  const onNodeClick = (click: MouseEvent<Element, globalThis.MouseEvent>, node: Node) => {
    click.preventDefault();

    if (node.type !== 'start' && node.type !== 'new') {
      setCurrentNode(node);
      setOpen(true);
    }
  };

  const closeNodeSidebar = () => setOpen(false);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    setInstance(reactFlowInstance);
  };

  // const onNodeDragStart = (_evt: MouseEvent, node: Node) => {
  //   instance && instance.addNodes([
  //     {
  //       id: 'drag',
  //       position: { x: 200, y: 200 },
  //       type: 'custom',
  //       data: {
  //         label: 'drag',
  //       },
  //       selectable: false,
  //       connectable: false,
  //       hidden: false,
  //     },
  //   ]);

  //   dragRef.current = nodes[nodes.length - 1];
  // };

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    // console.log(changes);

    changes.forEach((change) => {
      if (change.type === 'position') {
        // console.log('arrasto');
      } else {
        setNodes((nodes) => applyNodeChanges(changes, nodes));
      }
    });

  }, [setNodes]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [setEdges]
  );

  return (
    <>
      <ReactFlow
        onInit={onInit}
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}

        onNodeClick={(evt, node) => onNodeClick(evt, node)}

        // onNodeDragStart={onNodeDragStart}
        // onNodeDrag={onNodeDrag}
        // onNodeDragEnd={onNodeDragEnd}

        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}

        deleteKeyCode={null}
      >
        <Drawer
          anchor='right'
          variant='persistent'
          open={open}
          onClose={closeNodeSidebar}
        >
          <NodeSidebar
            closeNodeSidebar={closeNodeSidebar}
            currentNode={currentNode}
          />
        </Drawer>
        <MiniMap pannable />
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default Flow;
