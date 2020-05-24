import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import WebExAPI from '../api/WebExAPI';
import { Team } from '../types/WebEx';

const actionCreator = actionCreatorFactory('TEAM_ACTIONS');

export const getTeamsAction = actionCreator.async<void, Team[], string>('GET_TEAMS');

export const getTeams = async (dispatch: Dispatch, token: string): Promise<void> => {
  dispatch(getTeamsAction.started());
  try {
    const webExApi = new WebExAPI(token);
    const teams = await webExApi.getTeams();
    dispatch(
      getTeamsAction.done({
        result: teams,
      }),
    );
  } catch (error) {
    dispatch(
      getTeamsAction.failed({
        error: error.error,
      }),
    );
  }
};
