import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { getMessagesAction } from '../actions/MessageActions';
import { MessageState } from '../states/MessageState';

const initialMessageState: MessageState = {
  failureMessage: '',
  isLoading: false,
  messages: [],
};

const messageReducer = reducerWithInitialState(initialMessageState)
  .case(getMessagesAction.started, (state) => ({
    ...state,
    failureMessage: '',
    isLoading: true,
  }))
  .case(getMessagesAction.done, (state, payload) => ({
    ...state,
    failureMessage: '',
    isLoading: false,
    messages: payload.result,
  }))
  .case(getMessagesAction.failed, (state, payload) => ({
    ...state,
    failureMessage: payload.error,
    isLoading: false,
  }))
  .build();

export default messageReducer;
