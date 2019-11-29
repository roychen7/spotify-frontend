const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

    // "start": "nf start -p 3000",

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
     width: 150, 
     height: 100,
     webPreferences: {
       nodeIntegration: true
     }
    })
  
  mainWindow.setBackgroundColor('#282c34');
  mainWindow.setAlwaysOnTop(true);
  // mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})