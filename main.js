const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;
let nextServer;

// 리소스 경로 설정
const getResourcesPath = () => {
  if (isDev) {
    return __dirname;
  }
  return process.resourcesPath;
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'default',
    show: false,
    // 기본 아이콘 제거 (빌드 시 설정에서 처리)
  });

  // 개발 모드에서는 Next.js 개발 서버를, 프로덕션에서는 standalone 서버를 사용
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000'); // 포트 3000 사용 (개발 서버가 3000에서 실행됨)
    // 개발자 도구 열기
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션에서는 localhost의 다른 포트에서 Next.js 서버를 실행
    const port = 3001;
    startNextServer(port);

    // 서버가 시작될 때까지 잠시 대기 후 로드
    setTimeout(() => {
      mainWindow.loadURL(`http://localhost:${port}`);
    }, 2000);
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (nextServer) {
      nextServer.kill();
    }
  });
}

function startNextServer(port) {
  if (!isDev) {
    const serverPath = path.join(__dirname, 'dist/server.js');
    console.log('Starting Next.js server at:', serverPath);

    nextServer = spawn('node', [serverPath], {
      env: { ...process.env, PORT: port, NODE_ENV: 'production' },
      stdio: 'inherit',
      cwd: __dirname,
    });

    nextServer.on('error', (err) => {
      console.error('Next.js 서버 시작 실패:', err);
    });

    nextServer.on('exit', (code) => {
      console.log('Next.js 서버가 종료되었습니다. 코드:', code);
    });
  }
}

// 앱이 준비되면 창 생성
app.whenReady().then(createWindow);

// 모든 창이 닫히면 앱 종료 (macOS 제외)
app.on('window-all-closed', () => {
  if (nextServer) {
    nextServer.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 앱 종료 시 정리
app.on('before-quit', () => {
  if (nextServer) {
    nextServer.kill();
  }
});

// macOS용 메뉴 설정
if (process.platform === 'darwin') {
  const template = [
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
