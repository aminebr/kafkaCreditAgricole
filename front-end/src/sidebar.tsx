import React from 'react';
import { addEdge } from 'reactflow';
import useStore from './store';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import {  BsPlay, BsPause  } from "react-icons/bs";
import { FiSettings  } from "react-icons/fi";

import {  SiApachekafka } from "react-icons/si";

export default ({isOpen}) => {




  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };


  const state = useStore()

  const addEdges = () => {
    for ( var graphNode of state.nodes) {
      if (graphNode.data.title != "Topic" ){
        if (graphNode.data.title === "Consumer" ){
          addEdgeBetweenTopicAndNodes("topic",graphNode.id)
        }
        if (graphNode.data.title === "Producer" ){
          addEdgeBetweenTopicAndNodes(graphNode.id,"topic")
        }
      }
    }

  }

  const addEdgeBetweenTopicAndNodes = (graphNodeidSource : string,graphNodeidTarget:string ) => {
    const myEdge  = {
      id: 'e' +graphNodeidSource +'-'+ graphNodeidTarget ,
      source: graphNodeidSource,
      target: graphNodeidTarget,
    }
    const stateUpdate  = [{ item: myEdge, type: 'add' }];
    state.onEdgesChange(stateUpdate);

  }

  const findSelectedNode = () => {
    return state.nodes.filter( node => node.selected)[0]
  }


  
  return (
    <aside className={`customSideBar ${!isOpen && 'hidden'}`} >

      
      <br></br>

      
      <Tabs>
        <TabList>
          <Tab> < SiApachekafka/></Tab>
          <Tab><FiSettings/></Tab>
          <Tab><BsPlay/></Tab>
        </TabList>
        <TabPanel>
          <br></br>
          <br></br>
          <h2 className="description ">Composants : </h2>

          <br></br>
          <h3> Producer : </h3>
          <div className="description "> Un producteur Kafka envoie des messages à des Topics dans le cluster. </div>

          <div className="dndnode turbo divSelectorTurbo" onDragStart={(event) => onDragStart(event, 'turboProducer')} draggable>
            Producer
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h3> Consumer : </h3>
          <div className="description "> Un consumer Kafka reçois des messages des Topics dans le cluster. </div>
          <div className="dndnode turbo divSelectorTurbo" onDragStart={(event) => onDragStart(event, 'turboConsumer')} draggable>
            Consumer
          </div>
        </TabPanel>
        <TabPanel>
          <br></br>
          <br></br>
          <h2 className="description ">Composant selectionné :    </h2>  
          <br></br>

          <div className="description ">{findSelectedNode()?.data.title}</div>
          <div className="description ">{findSelectedNode()?.data.subline}</div>
          <form>
            <label>Enter your name:
              <input type="text" />
            </label>
          </form>
        </TabPanel>
        <TabPanel>

        <br></br>
        <br></br>
        <h2 className="description ">Pipeline :    </h2>  
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="description ">Start / Stop   </div>  
        <br></br>
        <div className="dndnode turbo divSelectorTurbo" onClick={(event) => addEdges() }>  <BsPlay/>   /   <BsPause/> </div>
        <br></br>
        <br></br>
        <div className="dndnode turbo divSelectorTurbo" onClick={(event) => console.log(state) }>Debug Store State</div>

        </TabPanel>
      </Tabs>

    </aside>
  );
};




