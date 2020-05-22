import 'ts-jest';

import appReducer from '../../src/reducers/AppReducer';
import { AppState } from '../../src/states/AppState';

describe('appReducer', () => {
  const appState: AppState = {
    currentView: 'rooms',
    selectedRoom: undefined,
  };

  test('setCurrentView', () => {
    const beforeState: AppState = {
      currentView: 'root',
      selectedRoom: undefined,
    };
    const afterState = appReducer(beforeState, {
      type: 'APP_ACTIONS/SET_CURRENT_VIEW',
      payload: {
        currentView: 'rooms',
        selectedRoom: undefined,
      },
    } as any);
    expect(afterState).toEqual(appState);
  });
});
