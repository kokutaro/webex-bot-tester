import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as WebEx from '../api/WebExAPI';
import { Message } from '../types/WebEx';

const actionCreator = actionCreatorFactory('MESSAGE_ACTIONS');

export const getMessagesAction = actionCreator.async<string, Message[], string>('GET_MESSAGES');

export const getMessages = async (dispatch: Dispatch, roomId: string): Promise<void> => {
  dispatch(getMessagesAction.started(roomId));
  try {
    const messages = await WebEx.getMessages(roomId);
    dispatch(
      getMessagesAction.done({
        result: messages,
        params: roomId,
      }),
    );
  } catch (error) {
    dispatch(
      getMessagesAction.failed({
        error: error.error,
        params: roomId,
      }),
    );
  }
};
