import electron from 'electron';
import fs from 'fs-extra';
import path from 'path';
import qs from 'querystring';
import { mocked } from 'ts-jest/utils';

import { loadTokens } from '../../src/core/authService';
import target, { loadConfigFromFile, saveConfigToFile } from '../../src/core/core';
import { Config } from '../../src/states/Config';
import { webExAuthPayload } from '../../src/types/WebEx';

jest.mock('fs-extra');

jest.mock('os', () => ({
  homedir: (): string => '/home',
  platform: jest.fn(),
  userInfo: (): { username: string } => ({ username: 'user_name' }),
}));

jest.genMockFromModule('electron');
jest.mock('electron');
jest.mock('../../src/core/authService');

const config: Config = {
  botToken: 'bot_token',
  userToken: 'user_token',
};

const configFilePath = path.join('/home', 'webex-bot-config.json');

describe('loadConfig', () => {
  test('Success load config file', async () => {
    mocked(fs.pathExists).mockResolvedValue(true as never);
    mocked(fs.readJSON).mockResolvedValue({ data: config } as never);

    const cfg = await loadConfigFromFile();

    expect(fs.ensureFileSync).not.toBeCalled();
    expect(fs.writeJSON).not.toBeCalled();

    expect(cfg).toEqual(config);
  });

  test('Success in case of file does not exist', async () => {
    mocked(fs.pathExists).mockResolvedValue(false as never);
    mocked(fs.readJSON).mockResolvedValue({ data: {} } as never);

    const cfg = await loadConfigFromFile();

    expect(fs.ensureFileSync).toBeCalledWith(configFilePath);
    expect(fs.writeJSON).toBeCalledWith(configFilePath, { data: {} });

    expect(cfg).toEqual({});
  });
});

describe('saveConfig', () => {
  test('Success save config file', async () => {
    mocked(fs.writeJSON).mockResolvedValue(undefined as never);

    const cfg = await saveConfigToFile(config);

    expect(fs.writeJSON).toBeCalledWith(configFilePath, { data: config });
    expect(cfg).toEqual(config);
  });
});

describe('loadAuthWindow', () => {
  let win: any | null = {
    loadURL: jest.fn(),
    show: jest.fn(),
    webContents: {
      session: {
        webRequest: {
          onBeforeRequest: jest.fn(),
        },
      },
    },
    on: jest.fn(),
    close: jest.fn(),
  };
  test('loadAuthWindow', (done) => {
    mocked(electron.remote.BrowserWindow).mockImplementation(() => win as any);

    mocked(loadTokens).mockResolvedValue();
    type Handler = {
      urls: string[];
    };
    type CallBack = (a: any) => void;
    mocked(win.webContents.session.webRequest.onBeforeRequest).mockImplementation(
      (handler: Handler, callback: CallBack) => {
        callback({ url: 'test' });
        expect(loadTokens).toBeCalledWith('test');
        done();
      },
    );

    mocked(win.on).mockImplementation(() => {});

    target.loadAuthWindow();

    expect(win.loadURL).toBeCalledWith(
      `https://webexapis.com/v1/authorize?${qs.stringify(webExAuthPayload)}`,
    );
  });

  test('loadAuthWindow - win === null', (done) => {
    mocked(electron.remote.BrowserWindow).mockImplementation(() => win as any);

    mocked(loadTokens).mockResolvedValue();

    type Handler = {
      urls: string[];
    };
    type CallBack = (a: any) => void;
    mocked(win.webContents.session.webRequest.onBeforeRequest).mockImplementation(
      (handler: Handler, callback: CallBack) => {
        win = null;
        callback({ url: 'test' });
        expect(loadTokens).toBeCalledWith('test');
        expect(win).toBeNull();
        done();
      },
    );

    mocked(win.on).mockImplementation((hdl: string, callback: CallBack) => {
      callback('closed');
      expect(hdl).toEqual('closed');
    });

    target.loadAuthWindow();
  });
});
