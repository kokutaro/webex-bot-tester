import React from 'react';
import { useSelector } from 'react-redux';

import { CurrentView } from '../states/AppState';
import { State } from '../states/State';
import { styled } from './FoundationStyles';
import RoomComponent from './RoomComponent';

const Main = styled.main`
  flex-grow: 1;
  height: calc(100vh - 85px);
  overflow-y: auto;
`;

const MainComponent: React.FC = () => {
  const currentView = useSelector<State, CurrentView>((state) => state.appState.currentView);
  const view = () => {
    switch (currentView) {
      case 'rooms':
        return <RoomComponent />;
      case 'root':
        return null;
      default:
        return null;
    }
  };
  return <Main>{view()}</Main>;
};
export default MainComponent;
