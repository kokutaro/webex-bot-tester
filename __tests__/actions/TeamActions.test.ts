import 'ts-jest';

import axios from 'axios';
import { mocked } from 'ts-jest/dist/util/testing';

import { getTeams, getTeamsAction } from '../../src/actions/TeamActions';
import { Team } from '../../src/types/WebEx';

const teams: Team[] = [];

jest.mock('axios');
const dispatch = jest.fn();

describe('getTeams', () => {
  test('success', async () => {
    mocked(axios.get).mockResolvedValueOnce({
      data: { items: [] },
    });
    const action = getTeamsAction.done({
      result: teams,
    });
    await getTeams(dispatch, 'token');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/teams');
  });

  test('Error', async () => {
    mocked(axios.get).mockRejectedValueOnce({
      error: 'Error',
    });
    const action = getTeamsAction.failed({
      error: 'Error',
    });
    await getTeams(dispatch, 'token');
    expect(dispatch).toBeCalledWith(action);
    expect(mocked(axios.get)).toBeCalledWith('/teams');
  });
});
