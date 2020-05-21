import { Room } from '../types/WebEx';
import { AsyncState } from './State';

export interface RoomState extends AsyncState {
  rooms: Room[];
}
