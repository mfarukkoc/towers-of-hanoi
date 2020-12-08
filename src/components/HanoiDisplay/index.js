import React, { useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Stick from './Stick';

const Screen = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  background-color: lightblue;
  width: 70%;
  height: 70%;
  padding: 8px 16px 0 16px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Button = styled.button`
  display: block;
  padding: 12px;
  font-size: 32px;
  font-weight: 500;
  border-radius: 10px;
  border: 0px;
  margin: 16px auto;
  background-color: lightblue;
  cursor: pointer;
`;
const NumberOfDisc = styled.div`
  display: inline-flex;
  padding: 12px;
  font-size: 32px;
  font-weight: 500;
  border-radius: 10px;
  border: 0px;
  margin: 16px auto;
  background-color: lightblue;
`;

const DiscControl = styled.button`
  display: inline-flex;
  height: 32px;
  width: 32px;
  text-align: center;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  line-height: 32px;
  margin: 0 8px;
  background-color: antiquewhite;
  font-size: 24px;
  font-weight: 500;
  border-radius: 50%;
  border: 0px;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    background-color: #f8fad7;
  }
`;

const ControlWrapper = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  padding: 0 16px 0 16px;
`;

const MinimumMoves = styled.div`
  font-size: 32px;
  font-weight: 500;
  position: absolute;
  right: 0;
  margin-right: 16px;
  z-index: 2;
`;
const HanoiDisplay = () => {
  const discMap = [
    { size: 1, color: '#efefef', draggableId: 'disk1' },
    { size: 2, color: '#CC33FF', draggableId: 'disk2' },
    { size: 3, color: '#6633FF', draggableId: 'disk3' },
    { size: 4, color: '#3366FF', draggableId: 'disk4' },
    { size: 5, color: '#33CCFF', draggableId: 'disk5' },
    { size: 6, color: '#33FFCC', draggableId: 'disk6' },
    { size: 7, color: '#33FF66', draggableId: 'disk7' },
    { size: 8, color: '#FFCC33', draggableId: 'disk8' },
    { size: 9, color: '#ff6633', draggableId: 'disk9' },
    { size: 10, color: '#800000', draggableId: 'disk10' },
  ];
  const [moveCount, setMoveCount] = useState(0);
  const [sticks, setSticks] = useState({
    stick0: [
      { size: 7, color: '#33FF66', draggableId: 'disk7', index: 0 },
      { size: 8, color: '#FFCC33', draggableId: 'disk8', index: 1 },
      { size: 9, color: '#ff6633', draggableId: 'disk9', index: 2 },
      { size: 10, color: '#800000', draggableId: 'disk10', index: 3 },
    ],
    stick1: [],
    stick2: [],
  });
  const [numberOfDiscs, setNumberOfDiscs] = useState(4);
  const [isSolving, setIsSolving] = useState(false);
  const handleNumberOfDiscsChange = (num) => {
    if (num < 3 || num > 10) return;
    setNumberOfDiscs(num);
    setSticks({
      stick0: [...discMap.slice(-num)].map((e, x) => {
        e['index'] = x;
        return e;
      }),
      stick1: [],
      stick2: [],
    });
    setMoveCount(0);
  };
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
          let temp = moveCount + 1;
          setMoveCount(temp);
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
    setIsSolving(true);
    move(numberOfDiscs, 'stick0', 'stick2', 'stick1');
    callStack.forEach((snap, i) => {
      setTimeout(() => {
        setSticks(snap);
        i += 1;
        let temp = moveCount + i;
        setMoveCount(temp);
        if (i === callStack.length) {
          setIsSolving(false);
        }
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
    <Wrapper>
      <ControlWrapper>
        <ButtonWrapper>
          <Button>Moves: {moveCount}</Button>
        </ButtonWrapper>
      </ControlWrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Screen>
          <MinimumMoves>Minimum {2 ** numberOfDiscs - 1} Moves</MinimumMoves>
          <Stick
            dropId="stick0"
            discs={sticks['stick0']}
            isSolving={isSolving}
          ></Stick>
          <Stick
            dropId="stick1"
            discs={sticks['stick1']}
            isSolving={isSolving}
          ></Stick>
          <Stick
            dropId="stick2"
            discs={sticks['stick2']}
            isSolving={isSolving}
          ></Stick>
        </Screen>
      </DragDropContext>
      <ControlWrapper>
        <ButtonWrapper>
          <Button onClick={() => handleSolve()} disabled={isSolving}>
            {isSolving ? 'Solving..' : 'Solve'}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <NumberOfDisc>
            <DiscControl
              onClick={() => handleNumberOfDiscsChange(numberOfDiscs - 1)}
              disabled={numberOfDiscs === 3 || isSolving}
            >
              -
            </DiscControl>{' '}
            {numberOfDiscs}{' '}
            <DiscControl
              onClick={() => handleNumberOfDiscsChange(numberOfDiscs + 1)}
              disabled={numberOfDiscs === 10 || isSolving}
            >
              +
            </DiscControl>
          </NumberOfDisc>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            onClick={() => handleNumberOfDiscsChange(numberOfDiscs)}
            disabled={isSolving}
          >
            Reset
          </Button>
        </ButtonWrapper>
      </ControlWrapper>
    </Wrapper>
  );
};

export default HanoiDisplay;
