import { Config } from '../states/Config';

export default interface Core {
  loadConfigFromFile: () => Promise<Config>;
  saveConfigToFile: (config: Config) => Promise<Config>;
}

declare global {
  interface Window {
    core: Core;
  }
}
