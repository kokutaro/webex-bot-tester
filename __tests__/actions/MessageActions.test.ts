import 'ts-jest';

import axios from 'axios';
import { mocked } from 'ts-jest/dist/util/testing';

import { getMessages, getMessagesAction } from '../../src/actions/MessageActions';
import { Message } from '../../src/types/WebEx';

const messages: Message[] = [];

jest.mock('axios');
const dispatch = jest.fn();

describe('getMessages', () => {
  test('success - Call with roomId', async () => {
    mocked(axios.get).mockResolvedValueOnce({
      data: { items: [] },
    });
    const action = getMessagesAction.done({
      params: 'room_id',
      result: messages,
    });
    await getMessages(dispatch, 'room_id');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/messages', {
      params: {
        roomId: 'room_id',
        mentionedPeople: 'me',
      },
    });
  });

  test('Error', async () => {
    mocked(axios.get).mockRejectedValueOnce({
      error: 'Error',
    });
    const action = getMessagesAction.failed({
      error: 'Error',
      params: 'room_id',
    });
    await getMessages(dispatch, 'room_id');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/messages', {
      params: {
        roomId: 'room_id',
        mentionedPeople: 'me',
      },
    });
  });
});
