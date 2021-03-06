import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

let development: boolean = false;
if (process.defaultApp
  || /[\\/]electron-prebuilt[\\/]/.test(process.execPath)
  || /[\\/]electron[\\/]/.test(process.execPath)) {
  development = true;
}

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    darkTheme: true,
    fullscreen: false,
    icon: __dirname + "/logo.ico",
    height: 900,
    minHeight: 450,
    minWidth: 800,
    resizable: true,
    show: true,
    width: 1600,
  });

  // and load the index.html of the app.
  const indexPath: string = path.join(__dirname, "./index.html");
  mainWindow.loadURL(
    url.format({
      pathname: indexPath,
      protocol: "file:",
      slashes: true,
    }),
  );

  // Open the DevTools if development
  if (development) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!mainWindow) {
    createWindow();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
