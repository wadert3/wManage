const { app, BrowserWindow } = require('electron');
const path = require('path');
const mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password: null,
  database: 'wMng-db'
  });

  connection.connect(function(err) {
      if(err){
          console.log(err.code);
          console.log(err.fatal);
      }
  })


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {

  app.quit();
}

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
           preload: path.join(__dirname, "preload.js"),

      },

  });


  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.maximize();
};




//app.on('ready', createWindow);



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    connection.end();
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
module.exports = createWindow;
