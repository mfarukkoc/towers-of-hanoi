import React from 'react';
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
    <S.Wrapper>
      <S.Stick></S.Stick>
      {props.children}
    </S.Wrapper>
  );
};

export default Stick;
