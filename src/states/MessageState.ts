import { Message } from '../types/WebEx';
import { AsyncState } from './State';

export interface MessageState extends AsyncState {
  messages: Message[];
}
