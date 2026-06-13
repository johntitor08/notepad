const { contextBridge, ipcRenderer, webUtils } = require('electron');

contextBridge.exposeInMainWorld('api', {
  newFile: () => ipcRenderer.invoke('new-file'),
  openFile: () => ipcRenderer.invoke('open-file'),
  readPath: (path) => ipcRenderer.invoke('read-path', path),
  saveFile: (content, path) => ipcRenderer.invoke('save-file', { content, path }),
  saveFileAs: (content) => ipcRenderer.invoke('save-file-as', content),
  minimize: () => ipcRenderer.invoke('minimize-window'),
  maximize: () => ipcRenderer.invoke('maximize-window'),
  close: () => ipcRenderer.invoke('close-window'),
  confirmClose: (count) => ipcRenderer.invoke('confirm-close', count),
  onCheckUnsaved: (cb) => ipcRenderer.on('check-unsaved', cb),
  getPathForFile: (file) => webUtils.getPathForFile(file),
});
