const {app, BrowserWindow} = require('electron');
const prepareRenderer = require('electron-next');
const path = require('path');
const isDev = require('electron-is-dev');

let win;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600});
  const devPath = 'http://localhost:8000/';
  const prodPath = path.resolve('renderer/out/index.html');
  const entry = isDev ? devPath : 'file://' + prodPath;
  win.loadURL(entry);

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', async () => {
  if (isDev) await prepareRenderer('./renderer');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
