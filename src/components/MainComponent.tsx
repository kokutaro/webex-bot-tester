import React from 'react';
import { useSelector } from 'react-redux';

import { CurrentView } from '../states/AppState';
import { State } from '../states/State';
import AboutComponent from './AboutComponent';
import { styled } from './FoundationStyles';

const Main = styled.main`
  flex-grow: 1;
`;

const MainComponent: React.FC = () => {
  const currentView = useSelector<State, CurrentView>((state) => state.appState.currentView);
  const view = () => {
    switch (currentView) {
      case 'about':
        return <AboutComponent />;
      case 'root':
        return null;
      default:
        return null;
    }
  };
  return <Main>{view()}</Main>;
};
export default MainComponent;
