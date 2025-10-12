const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        fullscreen: false,
        kiosk: false,
        maximizable: true,
        fullscreenable: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true, // Important for security
            enableRemoteModule: false, // Disable remote module for security reasons
            nodeIntegration: false // Do not enable nodeIntegration for security reasons
        }
    });
    mainWindow.maximize();

    // Load the local web server URL
    mainWindow.loadURL('http://localhost:5173');

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});