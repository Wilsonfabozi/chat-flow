import { NodeProps, Handle, Position, useReactFlow, getOutgoers } from 'reactflow';

const NewNode = ({ id, data }: NodeProps) => {
  const { setNodes, addNodes, addEdges, getNodes, getEdges } = useReactFlow();

  const addNewNode = () => {
    let nodesLength = 0;
    let parentNode: string | undefined = '';
    const stack = [];

    setNodes((nodes) => {
      nodesLength = nodes.length;

      return nodes.map((node) => {
        if (node.id === id) {
          parentNode = node?.parentNode;

          node.position = {
            ...node.position,
            y: node.position.y + 110,
          };
        }

        return node;
      });
    });

    const currentNode = getNodes().find((node) => node.id === parentNode);

    if (currentNode) {
      let nodesOnCurrentNode = getOutgoers(currentNode, getNodes(), getEdges());
      let YPosition = nodesOnCurrentNode.length - 1 === 0 ? 200 : 200 * nodesOnCurrentNode.length;

      stack.push(currentNode);

      let depth = 0;
      YPosition = 0;

      while (stack.length > 0) {
        const lastNode = stack.pop();

        if (lastNode) {
          depth = depth + 1;
          nodesOnCurrentNode = getOutgoers(lastNode, getNodes(), getEdges());
          // eslint-disable-next-line no-extra-parens
          nodesOnCurrentNode.forEach((node) => (node.type === 'custom' ? stack.push(node) : null));
          YPosition = YPosition + 200;
        }
      }

      setNodes((nodes) => {
        nodesLength = nodes.length;

        return nodes.map((node) => {
          if (node.id === id) {
            parentNode = node?.parentNode;

            node.position = {
              ...node.position,
              y: YPosition + 110,
            };
          }

          return node;
        });
      });

      addNodes([
        {
          id: nodesLength.toString(),
          position: { x: 200, y: YPosition },
          type: 'custom',
          data: {
            label: 'new',
          },
          parentNode,
          selectable: false,
          connectable: false,
          hidden: false,
        },
        {
          id: (nodesLength + 1).toString(),
          position: { x: 100, y: 110 },
          type: 'new',
          data: {
            label: '+',
          },
          parentNode: nodesLength.toString(),
          draggable: false,
          selectable: false,
          connectable: false,
          hidden: false,
        },
      ]);

      addEdges([
        {
          id: `${parentNode}-${nodesLength.toString()}`,
          source: parentNode,
          target: nodesLength.toString(),
          type: 'collapse',
          hidden: false,
        },
        {
          id: `${nodesLength.toString()}-${(nodesLength + 1).toString()}`,
          source: nodesLength.toString(),
          target: (nodesLength + 1).toString(),
          hidden: false,
        },
      ]);
    }
  };

  return (
    <div
      className='flex
        items-center
        justify-center
        bg-transparent
        w-8
        h-8
        text-2xl
        font-bold
        text-slate-600
        border-2
        rounded-full
        border-slate-300
        border-dotted'
      onClick={addNewNode}
    >
      <Handle
        type='target'
        position={Position.Left}
        isConnectable={false}
        draggable={false}
      />
      <div>{data.label}</div>
    </div>
  );
};

NewNode.displayName = 'NewNode';

export default NewNode;
