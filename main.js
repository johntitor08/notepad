const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;
let forceQuit = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#0f0f0f',
    titleBarStyle: 'hiddenInset',
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Guard against closing with unsaved changes: ask the renderer first.
  mainWindow.on('close', (e) => {
    if (forceQuit) return;
    e.preventDefault();
    mainWindow.webContents.send('check-unsaved');
  });
}

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

async function saveAs(content) {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'Metin Dosyası', extensions: ['txt'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: 'Tüm Dosyalar', extensions: ['*'] }
    ]
  });
  if (result.canceled) return null;
  fs.writeFileSync(result.filePath, content, 'utf-8');
  return { path: result.filePath };
}

// IPC Handlers
ipcMain.handle('new-file', async () => {
  return { path: null };
});

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Metin Dosyaları', extensions: ['txt', 'md', 'js', 'ts', 'html', 'css', 'json'] },
      { name: 'Tüm Dosyalar', extensions: ['*'] }
    ]
  });
  if (result.canceled) return null;
  const filePath = result.filePaths[0];
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return { path: filePath, content };
  } catch (err) {
    dialog.showErrorBox('Dosya açılamadı', err.message);
    return null;
  }
});

// Save to the tab's own path when known, otherwise fall back to Save As.
ipcMain.handle('save-file', async (event, { content, path: filePath }) => {
  if (filePath) {
    try {
      fs.writeFileSync(filePath, content, 'utf-8');
      return { path: filePath };
    } catch (err) {
      dialog.showErrorBox('Dosya kaydedilemedi', err.message);
      return null;
    }
  }
  return saveAs(content);
});

ipcMain.handle('save-file-as', async (event, content) => saveAs(content));

// Renderer's answer to the unsaved-changes prompt on window close.
ipcMain.handle('confirm-close', async (event, unsavedCount) => {
  if (unsavedCount > 0) {
    const { response } = await dialog.showMessageBox(mainWindow, {
      type: 'warning',
      buttons: ['İptal', 'Yine de Çık'],
      defaultId: 0,
      cancelId: 0,
      title: 'Kaydedilmemiş değişiklikler',
      message: `${unsavedCount} sekmede kaydedilmemiş değişiklik var.`,
      detail: 'Çıkmak istediğinizden emin misiniz?'
    });
    if (response === 0) return;
  }
  forceQuit = true;
  mainWindow.close();
});

ipcMain.handle('minimize-window', () => mainWindow.minimize());
ipcMain.handle('maximize-window', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.handle('close-window', () => mainWindow.close());
