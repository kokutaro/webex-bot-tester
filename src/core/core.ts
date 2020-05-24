import electron, { BrowserWindow } from 'electron';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import qs from 'querystring';

import { Config } from '../states/Config';
import { webExAuthPayload } from '../types/WebEx';
import { loadTokens } from './authService';
import Core from './CoreInterface';

const dataFilePath = path.join(os.homedir(), 'webex-bot-config.json');

export const saveConfigToFile = async (config: Config): Promise<Config> => {
  const curConf = await loadConfigFromFile();

  await fs.writeJSON(dataFilePath, {
    data: {
      ...curConf,
      ...config,
    },
  });
  return {
    ...curConf,
    ...config,
  };
};

export const loadConfigFromFile = async (): Promise<Config> => {
  const exist = await fs.pathExists(dataFilePath);
  if (!exist) {
    fs.ensureFileSync(dataFilePath);
    await fs.writeJSON(dataFilePath, { data: {} });
  }

  const jsonData = (await fs.readJSON(dataFilePath)) as { data: Config };
  return jsonData.data;
};

const loadAuthWindow = () => {
  let win: BrowserWindow | null = new electron.remote.BrowserWindow({
    width: 800,
    height: 800,
  });
  win.loadURL(`https://webexapis.com/v1/authorize?${qs.stringify(webExAuthPayload)}`);
  win.show();
  const {
    session: { webRequest },
  } = win.webContents;

  webRequest.onBeforeRequest(
    {
      urls: ['file:///callback*'],
    },
    ({ url }) => {
      loadTokens(url);
      win?.close();
    },
  );

  win.on('closed', () => {
    win = null;
  });
};

const core: Core = {
  saveConfigToFile,
  loadConfigFromFile,
  loadAuthWindow,
};

export default core;
