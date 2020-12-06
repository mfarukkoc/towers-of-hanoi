import styled from 'styled-components';
import HanoiDisplay from './components/HanoiDisplay';

const AppDiv = styled.div`
  background-color: lightslategray;
`;

function App() {
  return (
    <AppDiv>
      <HanoiDisplay></HanoiDisplay>
    </AppDiv>
  );
}

export default App;
