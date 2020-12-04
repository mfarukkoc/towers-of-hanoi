import React from 'react';
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
  return (
    <Screen>
      <Stick>
        <Disc size="6" color="black"></Disc>
        <Disc size="7" color="green"></Disc>
        <Disc size="8" color="blue"></Disc>
        <Disc size="9" color="darkred"></Disc>
      </Stick>
      <Stick></Stick>
      <Stick></Stick>
    </Screen>
  );
};

export default HanoiDisplay;
