import styled from 'styled-components';
import HanoiDisplay from './components/HanoiDisplay';
import Welcome from './components/Welcome';
const AppDiv = styled.div`
  background-color: lightslategray;
`;

function App() {
  return (
    <AppDiv>
      <Welcome></Welcome>
      <HanoiDisplay></HanoiDisplay>
    </AppDiv>
  );
}

export default App;
