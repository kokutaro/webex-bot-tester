import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadConfig } from '../actions/ConfigActions';
import { CurrentView } from '../states/AppState';
import { State } from '../states/State';
import { styled } from './FoundationStyles';
import MessageComponent from './MessageComponent';
import RoomComponent from './RoomComponent';
import SettingsComponent from './SettingsComponent';

const Main = styled.main`
  flex-grow: 1;
  height: calc(100vh - 85px);
  overflow-y: auto;
`;

const MainComponent: React.FC = () => {
  const dispatch = useDispatch();
  const currentView = useSelector<State, CurrentView>((state) => state.appState.currentView);
  useEffect(() => {
    loadConfig(dispatch);
  }, [dispatch]);
  const view = () => {
    switch (currentView) {
      case 'rooms':
        return <RoomComponent />;
      case 'root':
        return null;
      case 'messages':
        return <MessageComponent />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return null;
    }
  };
  return <Main>{view()}</Main>;
};
export default MainComponent;
