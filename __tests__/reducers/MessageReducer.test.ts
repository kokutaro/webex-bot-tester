import 'ts-jest';

import messageReducer from '../../src/reducers/MessageReducer';
import { MessageState } from '../../src/states/MessageState';
import { Message } from '../../src/types/WebEx';

describe('messageReducer', () => {
  const messages: Message[] = [];
  const messageStartedState: MessageState = {
    messages,
    failureMessage: '',
    isLoading: true,
  };
  const messageDoneState: MessageState = {
    messages,
    failureMessage: '',
    isLoading: false,
  };
  const messageFailedState: MessageState = {
    messages,
    failureMessage: 'Error',
    isLoading: false,
  };

  test('getMessagesAction: Started', () => {
    const beforeState: MessageState = {
      messages,
      failureMessage: 'Test',
      isLoading: false,
    };
    const afterState = messageReducer(beforeState, {
      type: 'MESSAGE_ACTIONS/GET_MESSAGES_STARTED',
    });
    expect(afterState).toEqual(messageStartedState);
  });

  test('getMessagesAction: Done', () => {
    const beforeState: MessageState = {
      messages,
      failureMessage: 'Test',
      isLoading: true,
    };
    const afterState = messageReducer(beforeState, {
      type: 'MESSAGE_ACTIONS/GET_MESSAGES_DONE',
      payload: {
        result: messages,
      },
    } as any);
    expect(afterState).toEqual(messageDoneState);
  });

  test('getMessagesAction: Failed', () => {
    const beforeState: MessageState = {
      messages,
      failureMessage: '',
      isLoading: true,
    };
    const afterState = messageReducer(beforeState, {
      type: 'MESSAGE_ACTIONS/GET_MESSAGES_FAILED',
      payload: {
        error: 'Error',
      },
    } as any);
    expect(afterState).toEqual(messageFailedState);
  });
});
