import fs from 'fs-extra';
import os from 'os';
import path from 'path';

import { Config } from '../states/Config';
import Core from './CoreInterface';

const dataFilePath = path.join(os.homedir(), 'webex-bot-config.json');

const saveConfigToFile = async (config: Config): Promise<Config> => {
  await fs.writeJSON(dataFilePath, { data: config });
  return config;
};

const loadConfigFromFile = async (): Promise<Config> => {
  const exist = await fs.pathExists(dataFilePath);
  if (!exist) {
    fs.ensureFileSync(dataFilePath);
    await fs.writeJSON(dataFilePath, { data: {} });
  }

  const jsonData = (await fs.readJSON(dataFilePath)) as { data: Config };
  return jsonData.data;
};

const core: Core = {
  saveConfigToFile,
  loadConfigFromFile,
};

export default core;
