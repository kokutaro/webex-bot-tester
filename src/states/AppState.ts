import { Room } from '../types/WebEx';

export type CurrentView = 'root' | 'rooms' | 'messages' | 'settings';
export interface AppState {
  currentView: CurrentView;
  selectedRoom?: Room;
}
