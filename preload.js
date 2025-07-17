const { contextBridge, ipcRenderer } = require('electron');

// 렌더러 프로세스에서 사용할 수 있는 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 예시: 파일 시스템 접근이나 네이티브 기능이 필요한 경우
  platform: process.platform,

  // IPC 통신 예시 (필요한 경우)
  // sendMessage: (message) => ipcRenderer.invoke('send-message', message),
  // onMessage: (callback) => ipcRenderer.on('message', callback),
});

// 보안을 위해 node integration을 비활성화했으므로
// 필요한 Node.js API만 선택적으로 노출
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
