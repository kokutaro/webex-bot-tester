import { AppState } from './AppState';
import { ConfigState } from './Config';
import { RoomState } from './RoomState';
import { TeamState } from './TeamState';

export interface AsyncState {
  isLoading: boolean;
  failureMessage: string;
}

export interface State {
  configState: ConfigState;
  appState: AppState;
  roomState: RoomState;
  teamState: TeamState;
}
