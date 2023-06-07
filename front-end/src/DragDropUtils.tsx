// DragDropUtils.ts

import FunctionIcon from "./FunctionIcon";

let id_consumer = 0;
const get_NewId_consumer = () => `consumer_${id_consumer++}`;

let id_producer = 0;
const get_NewId_producer = () => `producer_${id_producer++}`;

const createNewProducer = (position) => {
  let node_id  = get_NewId_producer()
  const newNode = {
    id: node_id,
    type : 'turbo',
    position,
    data: { icon: <FunctionIcon />, 
    title: 'Producer', 
    subline: node_id  
  },
  };
  return newNode
}

const createNewConsumer = (position) => {
  let node_id  = get_NewId_consumer()
  const newNode = {
    id: node_id,
    type : 'turbo',
    position,
    data: { icon: <FunctionIcon />, 
    title: 'Consumer', 
    subline: node_id 
  },
  };
  return newNode
}


const createTurboNode = (type,position) =>  {
  if(type === 'turboProducer') 
    return createNewProducer(position)
  if(type === 'turboConsumer') 
    return createNewConsumer(position)
}

export const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  
export const onDrop = (
    event: React.DragEvent,
    reactFlowWrapper: React.RefObject<HTMLDivElement>,
    reactFlowInstance: any,
    addNodeInStore: (node: any) => void
  ) => {
    event.preventDefault();
  
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
  
    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }
  
    const position = reactFlowInstance.project({
      x: event.clientX - (reactFlowBounds?.left || 0),
      y: event.clientY - (reactFlowBounds?.top || 0),
    });
  
    
    const newNode = createTurboNode(type,position)
  
    addNodeInStore([{ item: newNode, type: 'add' }]);
  };
  