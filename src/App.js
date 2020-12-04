import styled from 'styled-components';
import HanoiDisplay from './components/HanoiDisplay';

const AppDiv = styled.div`
  background-color: lightslategray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <AppDiv>
      <HanoiDisplay></HanoiDisplay>
    </AppDiv>
  );
}

export default App;
