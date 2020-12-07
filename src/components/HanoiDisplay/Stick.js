import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Disc from '../Disc';

const S = {};
S.Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  align-self: flex-end;
  justify-content: flex-end;
  background-color: ${(props) =>
    props.isDraggingOver ? 'lightgray' : 'transparent'};
`;
S.Stick = styled.div`
  position: absolute;
  align-self: center;
  width: 10px;
  top: 30%;
  height: 70%;
  border-radius: 10px 10px 0 0;
  background-color: black;
`;

const Stick = (props) => {
  return (
    <Droppable droppableId={props.dropId}>
      {(provided, snapshot) => (
        <S.Wrapper
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <S.Stick></S.Stick>
          {props.discs === undefined
            ? ''
            : props.discs.map((disc) => (
                <Disc
                  size={disc.size}
                  color={disc.color}
                  draggableId={disc.draggableId}
                  index={disc.index}
                  key={disc.draggableId}
                  isSolving={props.isSolving}
                ></Disc>
              ))}

          <span
            style={{
              display: 'none',
            }}
          >
            {provided.placeholder}
          </span>
        </S.Wrapper>
      )}
    </Droppable>
  );
};

export default Stick;
