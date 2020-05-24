import axios from 'axios';
import dotenv from 'dotenv';
import keytar from 'keytar';
import os from 'os';
import url from 'url';

dotenv.config();

import { WebExAuthResponse } from '../types/WebEx';
import { saveConfigToFile } from './core';

const keytarService = 'webex-tester-oauth';
const keytarAccount = os.userInfo().username;

const authApi = axios.create({
  baseURL: process.env.AUTH_URL,
  headers: {
    'x-api-key': process.env.API_KEY,
  },
});

export async function refreshTokens(): Promise<void> {
  const refreshToken = await keytar.getPassword(keytarService, keytarAccount);
  if (!refreshToken) {
    await logout();
    throw new Error('No refresh token stored');
  }
  try {
    const res = await authApi.get<{
      credentials: WebExAuthResponse;
    }>('/', {
      params: {
        refresh_token: refreshToken,
      },
    });
    const { access_token, refresh_token } = res.data.credentials;
    await saveConfigToFile({ userToken: access_token });
    keytar.setPassword(keytarService, keytarAccount, refresh_token);
  } catch (error) {
    await logout();
  }
}

export async function loadTokens(callbackURL: string): Promise<void> {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;

  try {
    const res = await authApi.get<{
      credentials: WebExAuthResponse;
    }>('/', {
      params: {
        code: query.code,
      },
    });

    const { access_token, refresh_token } = res.data.credentials;

    await saveConfigToFile({ userToken: access_token });

    keytar.setPassword(keytarService, keytarAccount, refresh_token);
  } catch (error) {
    logout();
  }
}

export async function logout(): Promise<void> {
  await keytar.deletePassword(keytarService, keytarAccount);
  await saveConfigToFile({ userToken: undefined });
}
