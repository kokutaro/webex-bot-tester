import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { setCurrentViewAction } from '../actions/AppActions';
import { AppState } from '../states/AppState';

const initialAppState: AppState = {
  currentView: 'root',
};

const appReducer = reducerWithInitialState(initialAppState)
  .case(setCurrentViewAction, (state, payload) => {
    return {
      ...state,
      currentView: payload.currentView,
      selectedRoom: payload.selectedRoom ?? state.selectedRoom,
    };
  })
  .build();

export default appReducer;
