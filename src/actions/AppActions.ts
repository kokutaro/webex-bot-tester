import actionCreatorFactory from 'typescript-fsa';

import { CurrentView } from '../states/AppState';
import { Room } from '../types/WebEx';

const actionCreator = actionCreatorFactory('APP_ACTIONS');

export const setCurrentViewAction = actionCreator<{
  currentView: CurrentView;
  selectedRoom?: Room;
}>('SET_CURRENT_VIEW');
