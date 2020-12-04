import React, { useState, useEffect } from 'react';
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
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.32), 0 3px 6px rgba(0, 0, 0, 0.46);
  }
`;

const Disc = (props) => {
  return (
    <S.Disc
      size={(props.size * 10).toString() + '%'}
      color={props.color}
    ></S.Disc>
  );
};

export default Disc;
