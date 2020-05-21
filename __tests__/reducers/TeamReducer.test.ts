import 'ts-jest';

import teamReducer from '../../src/reducers/TeamReducer';
import { TeamState } from '../../src/states/TeamState';
import { Team } from '../../src/types/WebEx';

describe('roomReducer', () => {
  const teams: Team[] = [];
  const teamStartedState: TeamState = {
    teams,
    failureMessage: '',
    isLoading: true,
  };
  const teamDoneState: TeamState = {
    teams,
    failureMessage: '',
    isLoading: false,
  };
  const teamFailedState: TeamState = {
    teams,
    failureMessage: 'Error',
    isLoading: false,
  };

  test('getRoomsAction: Started', () => {
    const beforeState: TeamState = {
      teams,
      failureMessage: 'Test',
      isLoading: false,
    };
    const afterState = teamReducer(beforeState, {
      type: 'TEAM_ACTIONS/GET_TEAMS_STARTED',
    });
    expect(afterState).toEqual(teamStartedState);
  });

  test('getRoomsAction: Done', () => {
    const beforeState: TeamState = {
      teams,
      failureMessage: 'Test',
      isLoading: true,
    };
    const afterState = teamReducer(beforeState, {
      type: 'TEAM_ACTIONS/GET_TEAMS_DONE',
      payload: {
        result: teams,
      },
    } as any);
    expect(afterState).toEqual(teamDoneState);
  });

  test('getRoomsAction: Failed', () => {
    const beforeState: TeamState = {
      teams,
      failureMessage: '',
      isLoading: true,
    };
    const afterState = teamReducer(beforeState, {
      type: 'TEAM_ACTIONS/GET_TEAMS_FAILED',
      payload: {
        error: 'Error',
      },
    } as any);
    expect(afterState).toEqual(teamFailedState);
  });
});
