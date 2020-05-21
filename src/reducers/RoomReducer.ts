import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { getRoomsAction } from '../actions/RoomActions';
import { RoomState } from '../states/RoomState';

const initialRoomState: RoomState = {
  failureMessage: '',
  isLoading: false,
  rooms: [],
};

const roomReducer = reducerWithInitialState(initialRoomState)
  .case(getRoomsAction.started, (state) => ({
    ...state,
    failureMessage: '',
    isLoading: true,
  }))
  .case(getRoomsAction.done, (state, payload) => ({
    ...state,
    failureMessage: '',
    isLoading: false,
    rooms: payload.result,
  }))
  .case(getRoomsAction.failed, (state, payload) => ({
    ...state,
    failureMessage: payload.error,
    isLoading: false,
  }))
  .build();

export default roomReducer;
