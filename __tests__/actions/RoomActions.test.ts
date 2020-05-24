import 'ts-jest';

import axios from 'axios';
import { mocked } from 'ts-jest/dist/util/testing';

import { getRooms, getRoomsAction } from '../../src/actions/RoomActions';
import { Room } from '../../src/types/WebEx';

const rooms: Room[] = [];

jest.mock('axios');
const dispatch = jest.fn();

describe('getRooms', () => {
  test('success', async () => {
    mocked(axios.get).mockResolvedValueOnce({
      data: { items: [] },
    });
    const action = getRoomsAction.done({
      params: '',
      result: rooms,
    });
    await getRooms(dispatch, 'token', '');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/rooms');
  });

  test('success - Call with teamId', async () => {
    mocked(axios.get).mockResolvedValueOnce({
      data: { items: [] },
    });
    const action = getRoomsAction.done({
      params: 'team',
      result: rooms,
    });
    await getRooms(dispatch, 'token', 'team');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/rooms?teamId=team');
  });

  test('Error', async () => {
    mocked(axios.get).mockRejectedValueOnce({
      error: 'Error',
    });
    const action = getRoomsAction.failed({
      error: 'Error',
      params: '',
    });
    await getRooms(dispatch, 'token', '');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/rooms');
  });
});
