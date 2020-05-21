import { combineReducers, createStore } from 'redux';

import appReducer from './reducers/AppReducer';
import configReducer from './reducers/ConfigReducer';
import { State } from './states/State';

const combinedReducers = combineReducers<State>({
  configState: configReducer,
  appState: appReducer,
});

const store = createStore(combinedReducers);

export default store;
