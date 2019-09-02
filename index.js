const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain
const dialog  = electron.dialog

let mainWindow;

function createWindow () {

  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      movable:true,
      show:false,
      icon: "./image/icone.png",
      webPreferences: {
          nodeIntegration: true
      }
  });

  mainWindow.setMenu(null);

  mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    })
    mainWindow.loadFile("index.html");

  mainWindow.on('closed', () => {
    mainWindow = null;
  })

  mainWindow.webContents.openDevTools();
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

// EVENT FROM SIDEBAR
ipc.on("version", function (event) {
    var versionInit = app.getVersion();
    event.sender.send("reponse-version", versionInit);
})

// EVENT FROM ERROR
ipc.on("error", function (event,title,msg) {
    dialog.showErrorBox(title,msg);
})
