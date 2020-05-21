import fs from 'fs-extra';
import path from 'path';
import { mocked } from 'ts-jest/utils';

import target from '../../src/core/core';
import { Config } from '../../src/states/Config';

jest.mock('fs-extra');

jest.mock('os', () => ({
  homedir: (): string => '/home',
  platform: jest.fn(),
}));

const config: Config = {
  botToken: 'bot_token',
  userToken: 'user_token',
};

const configFilePath = path.join('/home', 'webex-bot-config.json');

describe('loadConfig', () => {
  test('Success load config file', async () => {
    mocked(fs.pathExists).mockResolvedValue(true as never);
    mocked(fs.readJSON).mockResolvedValue({ data: config } as never);

    const cfg = await target.loadConfigFromFile();

    expect(fs.ensureFileSync).not.toBeCalled();
    expect(fs.writeJSON).not.toBeCalled();

    expect(cfg).toEqual(config);
  });

  test('Success in case of file does not exist', async () => {
    mocked(fs.pathExists).mockResolvedValue(false as never);
    mocked(fs.readJSON).mockResolvedValue({ data: {} } as never);

    const cfg = await target.loadConfigFromFile();

    expect(fs.ensureFileSync).toBeCalledWith(configFilePath);
    expect(fs.writeJSON).toBeCalledWith(configFilePath, { data: {} });

    expect(cfg).toEqual({});
  });
});

describe('saveConfig', () => {
  test('Success save config file', async () => {
    mocked(fs.writeJSON).mockResolvedValue(undefined as never);

    const cfg = await target.saveConfigToFile(config);

    expect(fs.writeJSON).toBeCalledWith(configFilePath, { data: config });
    expect(cfg).toEqual(config);
  });
});
