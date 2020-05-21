import { Team } from '../types/WebEx';
import { AsyncState } from './State';

export interface TeamState extends AsyncState {
  teams: Team[];
}
