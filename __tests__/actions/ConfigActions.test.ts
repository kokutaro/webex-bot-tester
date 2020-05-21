import '../../src/core/CoreInterface';
import 'ts-jest';

import {
  loadConfig,
  loadConfigAction,
  saveConfig,
  saveConfigAction,
} from '../../src/actions/ConfigActions';
import { Config } from '../../src/states/Config';

const dispatch = jest.fn();
const loadConfigFromFile = jest.fn();
const saveConfigToFile = jest.fn();

(global as any).window.core = {
  loadConfigFromFile,
  saveConfigToFile,
};

const config: Config = {
  botToken: 'bot_token',
  userToken: 'user_token',
};

describe('loadConfig', () => {
  test('Success', async () => {
    loadConfigFromFile.mockResolvedValueOnce(config);

    const action = loadConfigAction.done({
      result: config,
    });

    await loadConfig(dispatch);
    expect(dispatch).toBeCalledWith(action);
  });

  test('Error', async () => {
    loadConfigFromFile.mockRejectedValueOnce(new Error());

    const action = loadConfigAction.failed({
      error: 'Error',
    });

    await loadConfig(dispatch);
    expect(dispatch).toBeCalledWith(action);
  });
});

describe('saveConfig', () => {
  test('Success', async () => {
    saveConfigToFile.mockResolvedValueOnce(config);
    const actionStarted = saveConfigAction.started(config);
    const actionDone = saveConfigAction.done({
      params: config,
    });

    await saveConfig(config, dispatch);

    expect(dispatch).toBeCalledWith(actionStarted);
    expect(dispatch).toBeCalledWith(actionDone);
  });

  test('Error', async () => {
    saveConfigToFile.mockRejectedValueOnce(new Error());
    const actionStarted = saveConfigAction.started(config);
    const actionError = saveConfigAction.failed({
      params: config,
      error: 'Error',
    });

    await saveConfig(config, dispatch);

    expect(dispatch).toBeCalledWith(actionStarted);
    expect(dispatch).toBeCalledWith(actionError);
  });
});
