const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const widevine = require('electron-widevinecdm');

widevine.load(app);
console.log('loaded widevine app!')
if (widevine) {
  console.log('wide vine loaded');
} else {
  console.log('widevine not loaded')
}


const path = require('path')
const url = require('url')

    // "start": "nf start -p 3000",

let mainWindow

function createWindow() {
  widevine.load(app);
  mainWindow = new BrowserWindow({
     width: 150, 
     height: 80,
     webPreferences: {
       nodeIntegration: true,
       plugins: true
     }
    })
  
  mainWindow.setBackgroundColor('#282c34');
  mainWindow.setAlwaysOnTop(true);
  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    // process.env.ELECTRON_START_URL ||
    //   url.format({
    //     pathname: path.join(__dirname, '/../public/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    //   })
      'http://localhost:3000'
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