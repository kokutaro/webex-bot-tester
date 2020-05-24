import './core/CoreInterface';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';

import appReducer from './reducers/AppReducer';
import configReducer from './reducers/ConfigReducer';
import messageReducer from './reducers/MessageReducer';
import roomReducer from './reducers/RoomReducer';
import teamReducer from './reducers/TeamReducer';
import { State } from './states/State';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers<State>({
  configState: configReducer,
  appState: appReducer,
  roomState: roomReducer,
  teamState: teamReducer,
  messageState: messageReducer,
});

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(logger)));

export default store;
