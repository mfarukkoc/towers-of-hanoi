import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useVisited } from '../../hooks/useVisited';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-content: center;
  justify-content: center;
  background-color: lightblue;
  width: 70%;
  max-width: 500px;
  height: 70%;
  @media (max-width: 1024px) {
    width: 95%;
    padding: 8px 4px 0 4px;
  }
  padding: 8px 16px 0 16px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
`;

const disappearAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility:hidden;
  }
`;

const Center = styled.div`
  background-color: rgba(0, 0, 0, 80%);
  z-index: 99;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  animation-name: ${disappearAnimation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
  animation-play-state: ${(props) => (props.disappear ? 'running' : 'paused')};
`;

const dropAnimation = keyframes`
  from {
    visibility:visible;
    transform: translateY(-1000%); 
    opacity:0;
    }
  to {
    visibility:visible;
    transform: translateY(0%)}; 
    opacity:1 !important;
    }
`;

const Disc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
  width: ${(props) => props.width};
  height: 9%;
  border-radius: 20px;
  visibility: hidden;
  background-color: ${(props) => props.color};
  z-index: 1;
  align-self: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  color: aliceblue;
  font-weight: 600;
  animation-name: ${dropAnimation};
  animation-duration: 1s;
  animation-delay: ${(props) => props.delay};
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 32px;
  background: lightslategray;
  color: aliceblue;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 2;
  :hover {
    background-color: #8899aa;
  }
`;

const Welcome = () => {
  const hasVisited = useVisited();
  const [disappear, setDisappear] = useState(hasVisited);
  const handleClose = () => {
    setDisappear(true);
  };
  if (hasVisited) return <></>;
  return (
    <Center disappear={disappear}>
      <Wrapper>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <Disc color="#33EE55" delay="1s" width="90%">
          All disks should be on 3rd peg
        </Disc>
        <Disc color="#FFBB22" delay="0.5s" width="95%">
          Put smaller disks top of larger disks
        </Disc>
        <Disc color="#ff6633" delay="0s" width="100%">
          Only one disk can be moved at a time
        </Disc>
      </Wrapper>
    </Center>
  );
};

export default Welcome;
