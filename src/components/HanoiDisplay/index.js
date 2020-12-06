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
      { size: 6, color: 'black', draggableId: 'disk6', index: 0 },
      { size: 7, color: 'red', draggableId: 'disk7', index: 1 },
      { size: 8, color: 'blue', draggableId: 'disk8', index: 2 },
      { size: 9, color: 'green', draggableId: 'disk9', index: 3 },
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
  var callStack = [];
  var cloneSticks = { ...sticks };
  const handleSolve = () => {
    callStack = [];
    move(4, 'stick0', 'stick2', 'stick1');
    let i = 0;
    callStack.forEach((snap) => {
      i += 1;
      setTimeout(() => {
        console.log(snap); // display callStack for each snap debugging only
        setSticks(snap);
      }, 1000 * i);
    });
  };
  const move = (n, source, target, aux) => {
    if (n > 0) {
      move(n - 1, source, aux, target);
      let sourceClone = [...cloneSticks[source]];
      let targetClone = [...cloneSticks[target]];

      // move rings here
      targetClone.forEach((disc) => {
        disc.index += 1;
      });
      targetClone.unshift({ ...cloneSticks[source][0], index: 0 });
      sourceClone.splice(0, 1);
      sourceClone.forEach((disc) => {
        disc.index--;
      });

      callStack.push({
        ...cloneSticks,
        [source]: sourceClone,
        [target]: targetClone,
      });

      cloneSticks = {
        ...cloneSticks,
        [source]: sourceClone,
        [target]: targetClone,
      };
      move(n - 1, aux, target, source);
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Screen>
        <button
          onClick={() => handleSolve()}
          style={{ wordBreak: 'break-all' }}
        >
          Solve
        </button>
        {
          // displays list of sticks for debugging
          JSON.stringify(sticks, null, 4)
        }
        <Stick dropId="stick0" discs={sticks['stick0']}></Stick>
        <Stick dropId="stick1" discs={sticks['stick1']}></Stick>
        <Stick dropId="stick2" discs={sticks['stick2']}></Stick>
      </Screen>
    </DragDropContext>
  );
};

export default HanoiDisplay;
