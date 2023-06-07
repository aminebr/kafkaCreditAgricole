import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useOnSelectionChange,
  Controls,
} from 'reactflow';
import { shallow } from 'zustand/shallow';
import { onDragOver, onDrop } from './DragDropUtils';


import 'reactflow/dist/style.css';

import useStore from './store';

import TurboNode, { TurboNodeData } from './TurboNode';
import TurboEdge from './TurboEdge';
import FunctionIcon from './FunctionIcon';


import Sidebar from './Sidebar';

import './index.css';
import Customheader from './customheader';



const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});


  




function Flow() {
  
   const [isOpen , setIsOpen] = useState(true)

  const addNodeInStore = useStore((state) => state.onNodesChange);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect  } = useStore(selector, shallow);
  
  

  


  const handleDragOver = useCallback(
    (event: React.DragEvent) => onDragOver(event),
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) =>
      onDrop(event, reactFlowWrapper, reactFlowInstance, addNodeInStore),
    [reactFlowInstance, addNodeInStore]
  );



  return (
    <>
    <Customheader 
    isOpen={isOpen} 
    setIsOpen= {setIsOpen}
    />
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            onInit={setReactFlowInstance}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Controls showInteractive={false} />
            <svg>
              <defs>
                <linearGradient id="edge-gradient">
                  <stop offset="0%" stopColor="#ae53ba" />
                  <stop offset="100%" stopColor="#2a8af6" />
                </linearGradient>

                <marker
                  id="edge-circle"
                  viewBox="-5 -5 10 10"
                  refX="0"
                  refY="0"
                  markerUnits="strokeWidth"
                  markerWidth="10"
                  markerHeight="10"
                  orient="auto"
                >
                  <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
                </marker>
              </defs>
            </svg>
          </ReactFlow>

        </div>
        <Sidebar 
            isOpen={isOpen} 
        />
      </ReactFlowProvider>
    </div>
    
    </>
  );
}

export default Flow;



