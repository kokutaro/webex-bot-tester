import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import WebExAPI from '../api/WebExAPI';
import { Room } from '../types/WebEx';

const actionCreator = actionCreatorFactory('ROOM_ACTIONS');

export const getRoomsAction = actionCreator.async<string | undefined, Room[], string>('GET_ROOMS');

export const getRooms = async (
  dispatch: Dispatch,
  token: string,
  teamId?: string,
): Promise<void> => {
  dispatch(getRoomsAction.started(teamId));
  try {
    const webExApi = new WebExAPI(token);
    const rooms = await webExApi.getRooms(teamId);
    dispatch(
      getRoomsAction.done({
        params: teamId,
        result: rooms,
      }),
    );
  } catch (error) {
    dispatch(
      getRoomsAction.failed({
        error: error.error,
        params: teamId,
      }),
    );
  }
};
