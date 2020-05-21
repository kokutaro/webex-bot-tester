import 'ts-jest';

import configReducer from '../../src/reducers/ConfigReducer';
import { Config, ConfigState } from '../../src/states/Config';

describe('configReducer', () => {
  const config: Config = {
    botToken: 'bot_token',
    userToken: 'user_token',
  };
  const configStarted: ConfigState = {
    config: {},
    failureMessage: '',
    isLoading: true,
  };

  const configDone: ConfigState = {
    config,
    failureMessage: '',
    isLoading: false,
  };

  const configError: ConfigState = {
    config,
    failureMessage: 'Error',
    isLoading: false,
  };

  test('loadConfigAction: Started', () => {
    const beforeState: ConfigState = {
      config: {},
      failureMessage: 'test',
      isLoading: false,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/LOAD_CONFIG_STARTED',
    });
    expect(afterState).toEqual(configStarted);
  });

  test('loadConfigAction: Done', () => {
    const beforeState: ConfigState = {
      config: {},
      failureMessage: 'test',
      isLoading: true,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/LOAD_CONFIG_DONE',
      payload: {
        result: config,
      },
    } as any);
    expect(afterState).toEqual(configDone);
  });

  test('loadConfigAction: Failed', () => {
    const beforeState: ConfigState = {
      config: config,
      failureMessage: 'test',
      isLoading: true,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/LOAD_CONFIG_FAILED',
      payload: {
        error: 'Error',
      },
    } as any);
    expect(afterState).toEqual(configError);
  });

  test('saveConfigAction: Started', () => {
    const beforeState: ConfigState = {
      config: {},
      failureMessage: 'test',
      isLoading: false,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/SAVE_CONFIG_STARTED',
    });
    expect(afterState).toEqual(configStarted);
  });

  test('saveConfigAction: Done', () => {
    const beforeState: ConfigState = {
      config: {},
      failureMessage: 'test',
      isLoading: true,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/SAVE_CONFIG_DONE',
      payload: {
        params: config,
      },
    } as any);
    expect(afterState).toEqual(configDone);
  });

  test('saveConfigAction: Failed', () => {
    const beforeState: ConfigState = {
      config: config,
      failureMessage: 'test',
      isLoading: true,
    };
    const afterState = configReducer(beforeState, {
      type: 'CONFIG_ACTIONS/SAVE_CONFIG_FAILED',
      payload: {
        error: 'Error',
      },
    } as any);
    expect(afterState).toEqual(configError);
  });
});
