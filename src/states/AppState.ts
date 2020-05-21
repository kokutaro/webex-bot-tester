export type CurrentView = 'root' | 'rooms' | 'messages';
export interface AppState {
  currentView: CurrentView;
}
