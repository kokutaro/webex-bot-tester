import { compose } from 'redux';

import { Config } from '../states/Config';

export default interface Core {
  loadConfigFromFile: () => Promise<Config>;
  saveConfigToFile: (config: Config) => Promise<Config>;
  loadAuthWindow: () => void;
}

declare global {
  interface Window {
    core: Core;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
