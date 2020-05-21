import { AppState } from './AppState';
import { ConfigState } from './Config';

export interface AsyncState {
  isLoading: boolean;
  failureMessage: string;
}

export interface State {
  configState: ConfigState;
  appState: AppState;
}
