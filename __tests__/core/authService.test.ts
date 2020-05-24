import 'ts-jest';

import axios from 'axios';
import keytar from 'keytar';
import os from 'os';
import { mocked } from 'ts-jest/utils';

import { loadTokens, refreshTokens } from '../../src/core/authService';
import { saveConfigToFile } from '../../src/core/core';

const keytarService = 'webex-tester-oauth';
const keytarAccount = os.userInfo().username;

jest.mock('keytar');
jest.mock('axios');
jest.mock('../../src/core/core');

describe('refreshTokens', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('no refresh token', async () => {
    mocked(keytar.getPassword).mockResolvedValue(null);
    const p = refreshTokens();
    await expect(p).rejects.toThrowError('No refresh token stored');
  });

  test('refresh token', async () => {
    mocked(keytar.getPassword).mockResolvedValue('refresh_token');
    mocked(keytar.setPassword).mockResolvedValue();
    mocked(saveConfigToFile).mockResolvedValue({});
    mocked(axios.get).mockResolvedValue({
      status: 200,
      data: {
        credentials: {
          access_token: 'access_token',
          refresh_token: 'refresh_token',
          expires_in: 1234,
          refresh_token_expires_in: 5678,
        },
      },
    });
    await refreshTokens();
    expect(keytar.setPassword).toBeCalledWith(keytarService, keytarAccount, 'refresh_token');
    expect(saveConfigToFile).toBeCalledWith({ userToken: 'access_token' });
    expect(axios.get).toBeCalledWith('/', {
      params: {
        refresh_token: 'refresh_token',
      },
    });
  });

  test('refresh token fail', async () => {
    mocked(keytar.getPassword).mockResolvedValue('refresh_token');
    mocked(keytar.setPassword).mockResolvedValue();
    mocked(keytar.deletePassword).mockResolvedValue(true);
    mocked(saveConfigToFile).mockResolvedValue({});
    mocked(axios.get).mockRejectedValue({
      status: 400,
      data: 'failed',
    });
    await refreshTokens();
    expect(keytar.setPassword).not.toBeCalled();
    expect(saveConfigToFile).toBeCalledWith({ userToken: undefined });
    expect(axios.get).toBeCalledWith('/', {
      params: {
        refresh_token: 'refresh_token',
      },
    });
    expect(keytar.deletePassword).toBeCalledWith(keytarService, keytarAccount);
  });
});

describe('loadTokens', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('With callback url', async () => {
    mocked(keytar.setPassword).mockResolvedValue();
    mocked(saveConfigToFile).mockResolvedValue({});
    mocked(axios.get).mockResolvedValue({
      status: 200,
      data: {
        credentials: {
          access_token: 'access_token',
          refresh_token: 'refresh_token',
          expires_in: 1234,
          refresh_token_expires_in: 5678,
        },
      },
    });

    await loadTokens('file:///callback?code=code');
    expect(keytar.setPassword).toBeCalledWith(keytarService, keytarAccount, 'refresh_token');
    expect(saveConfigToFile).toBeCalledWith({ userToken: 'access_token' });
    expect(axios.get).toBeCalledWith('/', {
      params: {
        code: 'code',
      },
    });
  });

  test('Without callback url', async () => {
    mocked(keytar.setPassword).mockResolvedValue();
    mocked(saveConfigToFile).mockResolvedValue({});
    mocked(axios.get).mockRejectedValue({
      status: 400,
      data: 'failed',
    });

    await loadTokens('file:///callback');
    expect(keytar.deletePassword).toBeCalledWith(keytarService, keytarAccount);
    expect(saveConfigToFile).toBeCalledWith({ userToken: undefined });
    expect(axios.get).toBeCalledWith('/', {
      params: {
        code: undefined,
      },
    });
  });
});
