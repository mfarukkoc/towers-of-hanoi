import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const S = {};
S.Disc = styled.div`
  width: ${(props) => props.size};
  height: 7%;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  z-index: 1;
  align-self: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.5s;
  cursor: pointer;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.32), 0 3px 6px rgba(0, 0, 0, 0.46);
  }
`;

const Disc = (props) => {
  return (
    <Draggable
      draggableId={props.draggableId}
      index={props.index}
      isDragDisabled={props.index !== 0 ? true : false}
    >
      {(provided, snapshot) => (
        <S.Disc
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          size={(props.size * 10).toString() + '%'}
          color={props.color}
        ></S.Disc>
      )}
    </Draggable>
  );
};

export default Disc;
