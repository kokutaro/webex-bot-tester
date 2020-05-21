import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { getTeamsAction } from '../actions/TeamActions';
import { TeamState } from '../states/TeamState';

const initialTeamState: TeamState = {
  failureMessage: '',
  isLoading: false,
  teams: [],
};

const teamReducer = reducerWithInitialState(initialTeamState)
  .case(getTeamsAction.started, (state) => ({
    ...state,
    failureMessage: '',
    isLoading: true,
  }))
  .case(getTeamsAction.done, (state, payload) => ({
    ...state,
    failureMessage: '',
    isLoading: false,
    teams: payload.result,
  }))
  .case(getTeamsAction.failed, (state, payload) => ({
    ...state,
    failureMessage: payload.error,
    isLoading: false,
  }))
  .build();

export default teamReducer;
