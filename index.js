const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: false,
      movable:true,
      show:false,
      icon: "./image/icone.png",
      webPreferences: {
          nodeIntegration: true
      }
  });

  mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    })
    mainWindow.loadFile("index.html");

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  //mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// EVENT FROM TITLEBAR
ipc.on("close", function (event, arg) {
    mainWindow.close();
})

ipc.on("maximize", function (event, arg) {
    if(mainWindow.isMaximized()){
        mainWindow.unmaximize()
    }else{
        mainWindow.maximize();
    }
})

ipc.on("minimize", function (event, arg) {
    mainWindow.minimize();
})
