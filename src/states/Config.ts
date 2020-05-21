import { AsyncState } from './State';
export interface Config {
  userToken?: string;
  botToken?: string;
}

export interface ConfigState extends AsyncState {
  config: Config;
}
