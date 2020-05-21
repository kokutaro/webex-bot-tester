import { AppState } from './AppState';
import { ConfigState } from './Config';
import { RoomState } from './RoomState';

export interface AsyncState {
  isLoading: boolean;
  failureMessage: string;
}

export interface State {
  configState: ConfigState;
  appState: AppState;
  roomState: RoomState;
}
