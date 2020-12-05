import React from 'react';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Disc from '../Disc';
import Stick from './Stick';

const Screen = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: lightblue;
  width: 70%;
  height: 70%;
  padding: 8px 16px 0 16px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const HanoiDisplay = () => {
  const [sticks, setSticks] = useState({
    stick0: [
      { size: '6', color: 'black', draggableId: 'disk6', index: 0 },
      { size: '7', color: 'red', draggableId: 'disk7', index: 1 },
      { size: '8', color: 'blue', draggableId: 'disk8', index: 2 },
      { size: '9', color: 'green', draggableId: 'disk9', index: 3 },
    ],
    stick1: [],
    stick2: [],
  });
  const handleOnDragEnd = (result) => {
    if (result.source !== null && result.destination !== null) {
      const sourceId = result.source.droppableId;
      const destinationId = result.destination.droppableId;
      if (sourceId !== destinationId) {
        let sourceClone = sticks[sourceId];
        let destinationClone = sticks[destinationId];
        if (
          destinationClone.length
            ? sourceClone[0].size < destinationClone[0].size
            : true
        ) {
          destinationClone.forEach((disc) => {
            disc.index += 1;
          });
          destinationClone.unshift({ ...sticks[sourceId][0], index: 0 });
          sourceClone.splice(result.source.index, 1);
          sourceClone.forEach((disc) => {
            disc.index--;
          });
          setSticks({
            ...sticks,
            [sourceId]: sourceClone,
            [destinationId]: destinationClone,
          });
        }
      }
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Screen>
        {JSON.stringify(sticks, null, 4)}
        <Stick dropId="stick0" discs={sticks['stick0']}></Stick>
        <Stick dropId="stick1" discs={sticks['stick1']}></Stick>
        <Stick dropId="stick2" discs={sticks['stick2']}></Stick>
      </Screen>
    </DragDropContext>
  );
};

export default HanoiDisplay;
