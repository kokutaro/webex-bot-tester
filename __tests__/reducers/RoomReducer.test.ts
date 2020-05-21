import 'ts-jest';

import roomReducer from '../../src/reducers/RoomReducer';
import { RoomState } from '../../src/states/RoomState';
import { Room } from '../../src/types/WebEx';

describe('roomReducer', () => {
  const rooms: Room[] = [];
  const roomStartedState: RoomState = {
    rooms,
    failureMessage: '',
    isLoading: true,
  };
  const roomDoneState: RoomState = {
    rooms,
    failureMessage: '',
    isLoading: false,
  };
  const roomFailedState: RoomState = {
    rooms,
    failureMessage: 'Error',
    isLoading: false,
  };

  test('getRoomsAction: Started', () => {
    const beforeState: RoomState = {
      rooms,
      failureMessage: 'Test',
      isLoading: false,
    };
    const afterState = roomReducer(beforeState, {
      type: 'ROOM_ACTIONS/GET_ROOMS_STARTED',
    });
    expect(afterState).toEqual(roomStartedState);
  });

  test('getRoomsAction: Done', () => {
    const beforeState: RoomState = {
      rooms,
      failureMessage: 'Test',
      isLoading: true,
    };
    const afterState = roomReducer(beforeState, {
      type: 'ROOM_ACTIONS/GET_ROOMS_DONE',
      payload: {
        result: rooms,
      },
    } as any);
    expect(afterState).toEqual(roomDoneState);
  });

  test('getRoomsAction: Failed', () => {
    const beforeState: RoomState = {
      rooms,
      failureMessage: '',
      isLoading: true,
    };
    const afterState = roomReducer(beforeState, {
      type: 'ROOM_ACTIONS/GET_ROOMS_FAILED',
      payload: {
        error: 'Error',
      },
    } as any);
    expect(afterState).toEqual(roomFailedState);
  });
});
