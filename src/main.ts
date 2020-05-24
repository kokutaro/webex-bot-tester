import { app, BrowserWindow } from 'electron';
import path from 'path';

import { refreshTokens } from './core/authService';

const createWindow = async (): Promise<void> => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
      preload: path.join(__dirname, './core/preLoad.js'),
    },
  });

  win.loadFile(path.join(__dirname, './index.html'));

  await refreshTokens();

  if (process.argv.find((arg) => arg === '--debug')) {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
