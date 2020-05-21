import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { loadConfigAction, saveConfigAction } from '../actions/ConfigActions';
import { ConfigState } from '../states/Config';

const initialConfigState: ConfigState = {
  config: {},
  failureMessage: '',
  isLoading: false,
};

const configReducer = reducerWithInitialState(initialConfigState)
  /* loadConfigAction */
  .case(loadConfigAction.started, (state) => {
    return {
      ...state,
      isLoading: true,
      failureMessage: '',
    };
  })
  .case(loadConfigAction.done, (state, payload) => ({
    ...state,
    config: payload.result,
    isLoading: false,
    failureMessage: '',
  }))
  .case(loadConfigAction.failed, (state, payload) => ({
    ...state,
    isLoading: false,
    failureMessage: payload.error,
  }))

  /* saveConfigAction */
  .case(saveConfigAction.started, (state) => ({
    ...state,
    isLoading: true,
    failureMessage: '',
  }))
  .case(saveConfigAction.done, (state, payload) => ({
    ...state,
    config: payload.params,
    isLoading: false,
    failureMessage: '',
  }))
  .case(saveConfigAction.failed, (state, payload) => ({
    ...state,
    failureMessage: payload.error,
    isLoading: false,
  }))
  .build();

export default configReducer;
