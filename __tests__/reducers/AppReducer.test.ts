import 'ts-jest';

import appReducer from '../../src/reducers/AppReducer';
import { AppState } from '../../src/states/AppState';

describe('appReducer', () => {
  const appState: AppState = {
    currentView: 'rooms',
  };

  test('setCurrentView', () => {
    const beforeState: AppState = {
      currentView: 'root',
    };
    const afterState = appReducer(beforeState, {
      type: 'APP_ACTIONS/SET_CURRENT_VIEW',
      payload: 'rooms',
    } as any);
    expect(afterState).toEqual(appState);
  });
});
