import 'ts-jest';

import appReducer from '../../src/reducers/AppReducer';
import { AppState } from '../../src/states/AppState';

describe('appReducer', () => {
  const appState: AppState = {
    currentView: 'about',
  };

  test('setCurrentView', () => {
    const beforeState: AppState = {
      currentView: 'root',
    };
    const afterState = appReducer(beforeState, {
      type: 'APP_ACTIONS/SET_CURRENT_VIEW',
      payload: 'about',
    } as any);
    expect(afterState).toEqual(appState);
  });
});
