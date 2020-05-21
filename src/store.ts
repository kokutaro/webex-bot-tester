import { combineReducers, compose, createStore } from 'redux';

import appReducer from './reducers/AppReducer';
import configReducer from './reducers/ConfigReducer';
import roomReducer from './reducers/RoomReducer';
import teamReducer from './reducers/TeamReducer';
import { State } from './states/State';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers<State>({
  configState: configReducer,
  appState: appReducer,
  roomState: roomReducer,
  teamState: teamReducer,
});

const store = createStore(combinedReducers, composeEnhancers());

export default store;
